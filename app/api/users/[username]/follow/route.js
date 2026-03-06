import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { username: rawUsername } = await params;
    const username = rawUsername?.trim().toLowerCase();

    if (!username) {
      return NextResponse.json({ message: "Username is required." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ username }).select("followers followersCount").lean();
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (!session?.user?.email) {
      return NextResponse.json(
        { followersCount: user.followersCount ?? 0, followed: false },
        { status: 200 }
      );
    }

    const currentUser = await User.findOne({ email: session.user.email.trim().toLowerCase() })
      .select("_id")
      .lean();
    const followed = Boolean(
      currentUser?._id &&
        user.followers?.some((id) => id.toString() === currentUser._id.toString())
    );

    return NextResponse.json(
      { followersCount: user.followersCount ?? 0, followed },
      { status: 200 }
    );
  } catch (error) {
    console.error("Follow status error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Please login to follow creators." }, { status: 401 });
    }

    const { username: rawUsername } = await params;
    const username = rawUsername?.trim().toLowerCase();
    if (!username) {
      return NextResponse.json({ message: "Username is required." }, { status: 400 });
    }

    await connectDB();

    const currentUser = await User.findOne({ email: session.user.email.trim().toLowerCase() });
    if (!currentUser) {
      return NextResponse.json({ message: "User account not found." }, { status: 404 });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (user._id.toString() === currentUser._id.toString()) {
      return NextResponse.json({ message: "You cannot follow yourself." }, { status: 400 });
    }

    const isAlreadyFollowing = user.followers?.some(
      (id) => id.toString() === currentUser._id.toString()
    );

    if (!isAlreadyFollowing) {
      user.followers = [...(user.followers || []), currentUser._id];
      const baseCount =
        typeof user.followersCount === "number" ? user.followersCount : 0;
      user.followersCount = Math.max(baseCount + 1, user.followers.length);
      await user.save();
    }

    revalidatePath(`/${username}`);

    return NextResponse.json(
      {
        message: "Followed successfully.",
        followersCount: user.followersCount || 0,
        followed: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Follow error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
