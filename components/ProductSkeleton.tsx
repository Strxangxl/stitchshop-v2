export default function ProductSkeleton() {
  return (
    <div className="animate-pulse flex flex-col rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Structural Aspect-Ratio Box Matching Product Image */}
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 h-80" />

      {/* Content Text Simulation Lines */}
      <div className="p-4 space-y-3 flex-1 bg-white">
        {/* Product Title Bar */}
        <div className="h-4 w-3/4 bg-gray-200 rounded" />

        {/* Brand Meta Line */}
        <div className="h-3 w-1/3 bg-gray-200 rounded" />

        {/* Price Tag Line */}
        <div className="pt-2">
          <div className="h-5 w-1/4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
