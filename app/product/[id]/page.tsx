"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductDetails, clearProductDetails } from "@/store/productSlice";
import { addToCart } from "@/store/cartSlice";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [qty, setQty] = useState<number>(1);
  const { product, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }

    return () => {
      dispatch(clearProductDetails());
    };
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: qty,
      }),
    );

    router.push("/cart");
  };

  if (loading) {
    // Wrapped the loader container in a clean white full-screen shell
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  if (error) {
    // Wrapped the error layout in a clean white full-screen shell
    return (
      <div className="w-full min-h-screen bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md bg-red-50 p-4 border border-red-100">
            <p className="text-sm font-medium text-red-800">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    // Step 1: Force an edge-to-edge full-viewport minimal white baseline layout
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* Step 2: Constrain structural margins safely inside the white layout canvas */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
          >
            &larr; Back to Products
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Left Side: Product Image Display Panel */}
          {/* Left Side: Premium Fixed-Height Product Image Layout */}
          {/* Left Side: Natural Proportions Image Display */}
          <div className="w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50/50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain sm:rounded-lg"
            />
          </div>

          {/* Right Side: Product Configuration & Copy Block */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <p className="text-sm text-gray-400 italic mt-1">
                {product.brand}
              </p>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-3xl text-gray-900 font-bold">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Inventory Purchasing Action Panel */}
            <div className="rounded-lg border border-gray-200 p-6 bg-gray-50/70 space-y-4">
              <div className="flex items-center justify-between text-sm border-b border-gray-200 pb-3">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`font-semibold ${product.countInStock > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="quantity" className="text-gray-500">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="rounded-md border border-gray-300 py-1.5 px-3 bg-white text-sm font-medium shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className={`w-full flex items-center justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                  product.countInStock > 0
                    ? "bg-black hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
