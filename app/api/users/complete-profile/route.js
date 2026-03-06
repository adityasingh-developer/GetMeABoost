import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

function isValidUsername(username) {
  return /^[a-z0-9_]{3,24}$/.test(username);
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const name = body?.name?.trim() || session.user.name?.trim() || "";
    const username = body?.username?.trim().toLowerCase();
    const email =
      body?.email?.trim().toLowerCase() ||
      session.user.email?.trim().toLowerCase() ||
      "";
    const profileImage = body?.profileImage?.trim();
    const bannerImage = body?.bannerImage?.trim();
    const description = body?.description?.trim() || "";

    if (!username || !email || !profileImage || !bannerImage) {
      return NextResponse.json(
        { message: "Username, email, profile image and banner image are required." },
        { status: 400 }
      );
    }

    if (!isValidUsername(username)) {
      return NextResponse.json(
        { message: "Username must be 3-24 chars using lowercase letters, numbers, or _." },
        { status: 400 }
      );
    }

    await connectDB();

    const sessionEmail = session.user.email?.trim().toLowerCase();
    let user = sessionEmail ? await User.findOne({ email: sessionEmail }) : null;

    const usernameTaken = await User.findOne({
      username,
      ...(user ? { _id: { $ne: user._id } } : {}),
    });
    if (usernameTaken) {
      return NextResponse.json({ message: "Username is already taken." }, { status: 409 });
    }

    const emailTaken = await User.findOne({
      email,
      ...(user ? { _id: { $ne: user._id } } : {}),
    });
    if (emailTaken) {
      return NextResponse.json({ message: "Email is already in use." }, { status: 409 });
    }

    if (user) {
      user.name = name;
      user.username = username;
      user.email = email;
      user.profileImage = profileImage;
      user.bannerImage = bannerImage;
      user.description = description;
      await user.save();
    } else {
      user = await User.create({
        name,
        username,
        email,
        profileImage,
        bannerImage,
        description,
      });
    }

    return NextResponse.json(
      {
        message: "Profile completed successfully.",
        user: {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          bannerImage: user.bannerImage,
          description: user.description,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Complete profile error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
