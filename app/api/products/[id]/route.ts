import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/models/dbConnect";
import Product from "@/lib/models/Product";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    if (error.name === "CastError") {
      return NextResponse.json(
        { message: "Invalid Product ID format" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 },
    );
  }
}
