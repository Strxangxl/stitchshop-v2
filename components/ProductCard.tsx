"use client";

import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/app/types";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Product Image Wrapper */}
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 transition-opacity sm:h-96">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>

      {/* Product Text Meta Info */}
      <div className="flex flex-1 flex-col p-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/product/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>

        <p className="text-xs text-gray-500 italic">{product.brand}</p>

        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
