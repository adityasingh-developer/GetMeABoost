import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const sessionEmail = session.user.email?.trim().toLowerCase();
    await connectDB();

    const user = sessionEmail ? await User.findOne({ email: sessionEmail }) : null;
    const name = user?.name || session.user.name || "";
    const username = user?.username || "";
    const email = user?.email || sessionEmail || "";
    const profileImage = user?.profileImage || "";
    const bannerImage = user?.bannerImage || "";

    const missing = {
      username: !username,
      email: !email,
      profileImage: !profileImage,
      bannerImage: !bannerImage,
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
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile status error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
