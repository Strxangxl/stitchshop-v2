"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"; // Utilizing clean lucide icons

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { cartItems, itemsPrice } = useAppSelector((state) => state.cart);

  const updateCartHandler = (item: any, qty: number) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    router.push("/login?redirect=/shipping");
  };

  return (
    // Outer canvas forces white edge-to-edge across the entire viewport height
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* Constrained internal padding wrapper */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-10">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <ShoppingBag
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              strokeWidth={1}
            />
            <p className="text-sm text-gray-500 mb-6">
              Your shopping cart is completely empty.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-black px-6 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
            {/* Left Side: Product Line Items List */}
            <section className="lg:col-span-7 border-t border-gray-200 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex py-6 sm:py-6 gap-6 items-center justify-between"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between sm:grid sm:grid-cols-2 gap-4">
                    <div>
                      <Link
                        href={`/product/${item.product}`}
                        className="font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      {/* Quantity Selector Group */}
                      <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <button
                          type="button"
                          disabled={item.qty <= 1}
                          onClick={() => updateCartHandler(item, item.qty - 1)}
                          className="p-1.5 text-gray-500 hover:text-black disabled:opacity-30"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-sm font-medium text-gray-900">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          disabled={item.qty >= item.countInStock}
                          onClick={() => updateCartHandler(item, item.qty + 1)}
                          className="p-1.5 text-gray-500 hover:text-black disabled:opacity-30"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Trash Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Right Side: Order Summary Checkout Summary Panel */}
            <section className="mt-16 rounded-lg border border-gray-200 bg-gray-50/70 p-6 sm:p-8 lg:col-span-5 lg:mt-0 space-y-6">
              <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-4">
                Order Summary
              </h2>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                  items)
                </span>
                <span className="font-bold text-gray-900">
                  ${itemsPrice.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={checkoutHandler}
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-black py-3 px-4 text-base font-medium text-white hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
