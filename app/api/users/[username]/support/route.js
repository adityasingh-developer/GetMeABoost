import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req, { params }) {
  try {
    const { username: rawUsername } = await params;
    const username = rawUsername?.trim().toLowerCase();

    if (!username) {
      return NextResponse.json({ message: "Username is required." }, { status: 400 });
    }

    const body = await req.json();
    const name = body?.name?.trim();
    const email = body?.email?.trim()?.toLowerCase();
    const message = body?.message?.trim() || "";
    const amount = Number(body?.amount);

    if (!name || !email || !amount || amount < 1) {
      return NextResponse.json(
        { message: "Name, email and a valid amount are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    user.supporters = [
      ...(user.supporters || []),
      {
        name,
        email,
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
