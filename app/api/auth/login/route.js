import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return Response.json({ error: "Wrong password" }, { status: 400 });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  return Response.json({ token });
}
