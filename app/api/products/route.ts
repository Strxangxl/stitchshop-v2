import { NextResponse } from "next/server";
import dbConnect from "../../../lib/models/dbConnect";
import Product from "@/lib/models/Product";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const keyword = searchParams.get("keyword");

    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Server Error: Failed to fetch products",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
