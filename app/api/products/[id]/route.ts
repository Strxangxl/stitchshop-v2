import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/models/dbConnect";
import Product from "@/lib/models/Product";

// GET /api/products/[id] - Handled as an async Promise for Next.js 15+ compatibility
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Type defined as a Promise
) {
  try {
    await dbConnect();

    // Await the routing params completely before extracting properties
    const { id } = await params;

    const product = await Product.findById(id);

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
