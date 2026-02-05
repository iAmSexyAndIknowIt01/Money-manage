import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Имэйл эсвэл нууц үг буруу" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Имэйл эсвэл нууц үг буруу" },
        { status: 401 }
      );
    }

    // ✅ session cookie үүсгэнэ
    const response = NextResponse.json({
      message: "Амжилттай нэвтэрлээ",
    });

    response.cookies.set({
      name: "session",
      value: user._id.toString(), // 🔑 userId
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 өдөр
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
