"use client";

import { useEffect, useState, use } from "react"; // Imported 'use' hook from React
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductDetails, clearProductDetails } from "@/store/productSlice";
import { addToCart } from "@/store/cartSlice";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  // Use React's native 'use' hook to safely unwrap the async params object
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
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          &larr; Back to Products
        </Link>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center sm:rounded-lg"
          />
        </div>

        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <p className="text-sm text-gray-400 italic mt-1">{product.brand}</p>
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

          <div className="rounded-lg border border-gray-200 p-6 bg-gray-50 space-y-4">
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
              className={`w-full flex items-center justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                product.countInStock > 0
                  ? "bg-black hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
