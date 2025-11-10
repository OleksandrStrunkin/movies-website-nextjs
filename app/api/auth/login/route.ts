import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User"

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) throw new Error("Missing JWT_SECRET in .env");

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
