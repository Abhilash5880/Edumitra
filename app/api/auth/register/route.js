import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { name, email, password, examType } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashed, examType });

  return Response.json({ success: true });
}
