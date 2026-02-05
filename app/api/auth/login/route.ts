import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Имэйл эсвэл нууц үг дутуу байна" },
        { status: 400 }
      );
    }

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

    // 🔐 Одоохондоо session/JWT хийхгүй
    return NextResponse.json({
      message: "Амжилттай нэвтэрлээ",
      userId: user._id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
