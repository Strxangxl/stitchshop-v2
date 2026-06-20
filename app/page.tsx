"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/productSlice";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const [sortBy, setSortBy] = useState<
    "recommended" | "lowToHigh" | "highToLow"
  >("recommended");

  // New local loading flag explicitly dedicated to the sorting transition lifecycle
  const [isSorting, setIsSorting] = useState(false);

  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Intercept the native dropdown event to trigger a timed loading sequence
  const handleSortChange = (
    newOrder: "recommended" | "lowToHigh" | "highToLow",
  ) => {
    setIsSorting(true);
    setSortBy(newOrder);

    // Enforce an absolute 1-second delay execution window for layout polish
    setTimeout(() => {
      setIsSorting(false);
    }, 1000);
  };

  const getSortedProducts = () => {
    const productsCopy = [...products];
    if (sortBy === "lowToHigh")
      return productsCopy.sort((a, b) => a.price - b.price);
    if (sortBy === "highToLow")
      return productsCopy.sort((a, b) => b.price - a.price);
    return productsCopy;
  };

  const sortedProducts = getSortedProducts();

  // Combine initial database thunk status with your micro-interaction state tracker
  const showSkeletonLoader = loading || isSorting;

  return (
    <main className="w-full pb-12 bg-white text-gray-900">
      <HeroSlider />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-white">
        {/* Structural Heading and Sorting Control Container */}
        <div className="border-b border-gray-200 pb-5 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Latest Arrivals
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Explore premium minimal designs tailored for structural
              silhouettes.
            </p>
          </div>

          {/* Sort By Dropdown Interface Segment */}
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-gray-600 shrink-0"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              disabled={loading} // Prevent interaction while initial API loading is unfinished
              onChange={(e) => handleSortChange(e.target.value as any)}
              className="rounded-md border border-gray-300 bg-white py-1.5 px-3 text-sm font-medium text-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
            >
              <option value="recommended">Recommended</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

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
            {showSkeletonLoader
              ? // Reuses the premium layout skeletons whenever a sort event triggers
                [...Array(4)].map((_, index) => <ProductSkeleton key={index} />)
              : sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24">
            <p className="text-sm text-gray-500">
              No products found in the database catalog.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
