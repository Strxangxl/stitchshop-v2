"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/productSlice";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton"; // Imported your skeleton component

export default function HomePage() {
  const dispatch = useAppDispatch();

  // Connect to the products state department inside the warehouse
  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  // Trigger the database fetch instantly when the component mounts onto the screen
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Structural Heading Banner Section */}
      <div className="border-b border-gray-200 pb-5 mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Latest Arrivals
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Explore premium minimal designs tailored for structural silhouettes.
        </p>
      </div>

      {/* Error Boundary Notification Block */}
      {error && (
        <div className="rounded-md bg-red-50 p-4 my-4">
          <p className="text-sm font-medium text-red-800">
            Error loading products: {error}
          </p>
        </div>
      )}

      {/* Main Grid View Area */}
      {!error && (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {loading
            ? // Swapped the single spinner container for a structural layout placeholder loop
              [...Array(4)].map((_, index) => <ProductSkeleton key={index} />)
            : // Render your actual live database data cards when fulfilled
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      )}

      {/* Fallback empty view */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-24">
          <p className="text-sm text-gray-500">
            No products found in the database catalog.
          </p>
        </div>
      )}
    </main>
  );
}
