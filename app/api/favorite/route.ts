import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET as string;


// Middleware: перевірка токена
async function verifyToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch {
    return null;
  }
}

// ⬇️ Додати або прибрати з улюблених
export async function POST(req: Request) {
  try {
    await connectDB();
    const userId = await verifyToken(req);
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { movieId } = await req.json();
    if (!movieId)
      return NextResponse.json({ message: "Missing movieId" }, { status: 400 });

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const index = user.favorites.indexOf(movieId);
    if (index === -1) {
      user.favorites.push(movieId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();

    return NextResponse.json({
      message: index === -1 ? "Added to favorites" : "Removed from favorites",
      favorites: user.favorites,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ⬇️ Отримати улюблені
export async function GET(req: Request) {
  try {
    await connectDB();
    const userId = await verifyToken(req);
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ favorites: user.favorites });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
