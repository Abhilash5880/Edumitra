
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, password, examType } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    await dbConnect();

 
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      examType: examType || "UPSC",
    });

 
    const userSafe = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      examType: newUser.examType,
    };

    return NextResponse.json({ success: true, user: userSafe }, { status: 201 });
  } catch (err) {
    console.error("register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
