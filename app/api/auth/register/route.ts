import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) throw new Error("Missing MONGODB_URI in .env");

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
  console.log("✅ Connected to MongoDB");
}

// ✅ 2. Створюємо схему користувача
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

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

    // Створюємо користувача
    const newUser = new User({ username, email, password });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error creating user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
