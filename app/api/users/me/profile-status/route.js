import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

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

export async function GET() {
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

    const user = sessionEmail
      ? await User.findOne({ email: sessionEmail })
          .select("name username email profileImage bannerImage description links")
          .lean()
      : null;
    const name = user?.name || session.user.name || "";
    const username = user?.username || "";
    const email = user?.email || sessionEmail || "";
    const profileImage = user?.profileImage || "";
    const bannerImage = user?.bannerImage || "";
    const description = user?.description || "";
    const links = normalizeLinks(user?.links);
    const missing = {
      username: !username,
      email: !email,
      profileImage: !profileImage,
      bannerImage: !bannerImage,
      description: !description,
    };

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
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .select("name username email profileImage bannerImage description links updatedAt")
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
