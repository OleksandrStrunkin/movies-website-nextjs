import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

// ✅ 3. Обробка POST-запиту
export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Перевіряємо чи користувач вже існує
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Створюємо користувача
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: {username, email} },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error creating user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
