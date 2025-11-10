import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const { username } = await req.json();
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { username },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Username updated", user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error updating user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
