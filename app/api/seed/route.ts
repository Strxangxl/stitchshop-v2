import { NextResponse } from "next/server";
import dbConnect from "../../../lib/models/dbConnect";
import Product from "@/lib/models/Product";
import { products } from "@/data/products";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Not allowed in production environment" },
      { status: 403 },
    );
  }

  try {
    await dbConnect();

    await Product.deleteMany({});

    const createdProducts = await Product.insertMany(products);

    return NextResponse.json(
      {
        message: "Database seeded successfully!",
        count: createdProducts.length,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Seeding failed", error: error.message },
      { status: 500 },
    );
  }
}
