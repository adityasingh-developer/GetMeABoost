import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { normalizePageSections } from "@/lib/pageSections";

function toText(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function normalizeLinkKey(rawKey) {
  const base = toText(rawKey);
  if (!base) return "";

  // Mongo object keys cannot include "." or start with "$".
  const noDots = base.replaceAll(".", "_");
  const noLeadingDollar = noDots.replace(/^\$+/, "");
  return noLeadingDollar;
}

function normalizeLinks(input) {
  if (!input || typeof input !== "object") {
    return {};
  }

  let entries = [];
  if (input instanceof Map) {
    entries = Array.from(input.entries());
  } else if (Array.isArray(input)) {
    entries = input;
  } else {
    entries = Object.entries(input);
  }

  const normalized = {};
  for (const [rawKey, rawValue] of entries) {
    const key = normalizeLinkKey(rawKey);
    const value = toText(rawValue);

    if (!key || !value) {
      continue;
    }

    normalized[key] = value;
  }

  return normalized;
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const sessionEmail = String(session.user.email || "").trim().toLowerCase();
    if (!sessionEmail) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const url = new URL(req.url);
    const scope = url.searchParams.get("scope");
    const isDashboardScope = scope === "dashboard";
    const selectFields = isDashboardScope
      ? "name username email profileImage bannerImage description links pageSections supporters followersCount members totalSupportAmount memberTiers membershipTiers"
      : "name username email profileImage bannerImage description links pageSections";

    const user = sessionEmail
      ? await User.findOne({ email: sessionEmail }).select(selectFields).lean()
      : null;
    const name = user?.name || session.user.name || "";
    const username = user?.username || "";
    const email = user?.email || sessionEmail || "";
    const profileImage = user?.profileImage || "";
    const bannerImage = user?.bannerImage || "";
    const description = user?.description || "";
    const links = normalizeLinks(user?.links);
    const pageSections = normalizePageSections(user?.pageSections);
    const missing = {
      username: !username,
      email: !email,
      profileImage: !profileImage,
      bannerImage: !bannerImage,
      description: !description,
    };

    if (isDashboardScope) {
      const supporters = Array.isArray(user?.supporters) ? user.supporters : [];
      const members = Array.isArray(user?.members) ? user.members : [];
      const supporterUserIds = supporters.map((supporter) => supporter?.user).filter(Boolean);
      const memberUserIds = members.map((member) => member?.user).filter(Boolean);
      const relatedUserIds = Array.from(
        new Set([...supporterUserIds, ...memberUserIds].map((id) => id.toString()))
      );
      const relatedUsers = relatedUserIds.length
        ? await User.find({ _id: { $in: relatedUserIds } })
            .select("name username profileImage")
            .lean()
        : [];
      const relatedUsersById = new Map(
        relatedUsers.map((relatedUser) => [relatedUser._id.toString(), relatedUser])
      );

      const formattedSupporters = supporters.map((supporter, index) => {
        const supporterUserId = supporter?.user?.toString?.() || "";
        const supporterUser = relatedUsersById.get(supporterUserId);
        return {
          id: supporter?._id?.toString?.() || `${supporterUserId || "supporter"}-${index}`,
          name: supporterUser?.name || supporterUser?.username || supporter?.name || "Anonymous",
          profileImage: supporterUser?.profileImage || "",
          message: String(supporter?.message || ""),
          amount: Number(supporter?.amount || 0),
          supportedAt: supporter?.supportedAt ? new Date(supporter.supportedAt).toISOString() : null,
        };
      });

      const formattedMembers = members.map((member, index) => {
        const memberUserId = member?.user?.toString?.() || "";
        const memberUser = relatedUsersById.get(memberUserId);
        return {
          id: member?._id?.toString?.() || `${memberUserId || "member"}-${index}`,
          name: memberUser?.name || memberUser?.username || "Unknown member",
          type: member?.tier?.name?.trim() || "Member",
          amount: Number(member?.tier?.price || 0),
        };
      });

      return NextResponse.json(
        {
          name,
          username,
          email,
          profileImage,
          bannerImage,
          description,
          links,
          pageSections,
          followersCount: Number(user?.followersCount || 0),
          supportersCount: supporters.length,
          membersCount: members.length,
          totalSupportAmount: Number(user?.totalSupportAmount || 0),
          supporters: formattedSupporters,
          members: formattedMembers,
          membershipTiers: user?.memberTiers ?? user?.membershipTiers ?? [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        complete: !Object.values(missing).some(Boolean),
        missing,
        user: {
          name,
          username,
          email,
          profileImage,
          bannerImage,
          description,
          links,
          pageSections,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile status error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong.",
        ...(process.env.NODE_ENV !== "production" ? { error: String(error?.message || error) } : {}),
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const name = toText(body?.name);
    const profileImage = toText(body?.profileImage);
    const bannerImage = toText(body?.bannerImage);
    const description = toText(body?.description);
    const links = normalizeLinks(body?.links);
    const pageSections = normalizePageSections(body?.pageSections);

    if (!name || !profileImage || !bannerImage || !description) {
      return NextResponse.json(
        { message: "Name, profile image, banner image and description are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const sessionEmail = String(session.user.email || "").trim().toLowerCase();
    if (!sessionEmail) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: sessionEmail },
      {
        $set: {
          name,
          profileImage,
          bannerImage,
          description,
          links,
          pageSections,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .select("name username email profileImage bannerImage description links pageSections updatedAt")
      .lean();

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Settings updated successfully.",
        user: {
          name: updatedUser?.name || "",
          username: updatedUser?.username || "",
          email: updatedUser?.email || sessionEmail,
          profileImage: updatedUser?.profileImage || "",
          bannerImage: updatedUser?.bannerImage || "",
          description: updatedUser?.description || "",
          links: normalizeLinks(updatedUser?.links),
          pageSections: normalizePageSections(updatedUser?.pageSections),
          updatedAt: updatedUser?.updatedAt || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong.",
        ...(process.env.NODE_ENV !== "production" ? { error: String(error?.message || error) } : {}),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const pageSections = normalizePageSections(body?.pageSections);
    const sessionEmail = String(session.user.email || "").trim().toLowerCase();
    if (!sessionEmail) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const updatedUser = await User.findOneAndUpdate(
      { email: sessionEmail },
      { $set: { pageSections } },
      { new: true, runValidators: true }
    )
      .select("pageSections updatedAt")
      .lean();

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Page visibility updated.",
        pageSections: normalizePageSections(updatedUser?.pageSections),
        updatedAt: updatedUser?.updatedAt || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Page visibility update error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong.",
        ...(process.env.NODE_ENV !== "production" ? { error: String(error?.message || error) } : {}),
      },
      { status: 500 }
    );
  }
}
