import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/models/dbConnect";
import User from "@/lib/models/User";
import generateToken from "@/lib/generateToken";

// POST /api/auth/register - Register a new user
export async function POST(request: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    // 1. Check if the incoming email already exists in the system
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists with this email address" },
        { status: 400 },
      );
    }

    // 2. Create and store a new user document (the pre-save hook will handle password hashing)
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      return NextResponse.json(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user.id), // Fixed: used user.id instead of casting _id
        },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { message: "Invalid user data received" },
      { status: 400 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 },
    );
  }
}
