import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = body?.name?.trim();
    const username = body?.username?.trim().toLowerCase();
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password;

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { message: "Name, username, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existing) {
      return NextResponse.json(
        { message: "Email or username is already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Signup successful." }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong while creating account." },
      { status: 500 }
    );
  }
}
