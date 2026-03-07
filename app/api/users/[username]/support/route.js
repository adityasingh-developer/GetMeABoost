import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    const { username: rawUsername } = await params;
    const username = rawUsername?.trim().toLowerCase();

    if (!username) {
      return NextResponse.json({ message: "Username is required." }, { status: 400 });
    }

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Please login to support creators." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const message = body?.message?.trim() || "";
    const amount = Number(body?.amount);

    if (!amount || amount < 1) {
      return NextResponse.json(
        { message: "A valid amount is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const supporterUser = await User.findOne({
      email: session.user.email.trim().toLowerCase(),
    }).select("_id");
    if (!supporterUser) {
      return NextResponse.json({ message: "User account not found." }, { status: 404 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (user._id.toString() === supporterUser._id.toString()) {
      return NextResponse.json(
        { message: "You cannot support yourself." },
        { status: 400 }
      );
    }

    user.supporters = [
      ...(user.supporters || []),
      {
        user: supporterUser._id,
        message,
        amount,
        supportedAt: new Date(),
      },
    ];

    await user.save();
    revalidatePath(`/${username}`);

    return NextResponse.json(
      {
        message: "Support sent successfully.",
        supportersCount: user.supporters.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Support save error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

