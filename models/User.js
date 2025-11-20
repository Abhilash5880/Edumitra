// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  examType: { type: String, default: "UPSC" },
  createdAt: { type: Date, default: Date.now },
});

// Avoid recompilation errors in dev with Next hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
