import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userid: user._id, name: user.name || "User" },
      "secret",
      { expiresIn: "1d" }
    );
    return Response.json({ token });
  } catch (error) {
    return Response.json({ message: "Internal server error" });
  }
}

