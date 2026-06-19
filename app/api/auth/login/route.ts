import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/models/dbConnect";
import User from "@/lib/models/User";
import generateToken from "@/lib/generateToken";

// POST /api/auth/login - Authenticate user & get token
export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    // 1. Find the user profile by their email address
    const user = await User.findOne({ email });

    // 2. If user exists, use our schema method to compare hashes
    if (user && (await user.matchPassword(password))) {
      return NextResponse.json(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user.id), // Fixed: used user.id instead of casting _id
        },
        { status: 200 },
      );
    }

    // 3. Fallback error if email doesn't exist or hash matching fails
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 },
    );
  }
}
