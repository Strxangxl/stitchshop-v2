"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, removeFromCart } from "@/store/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();

  // Pull the entire cart department status out of the global store warehouse
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useAppSelector((state) => state.cart);

  // Updates item quantity when the user alters the select element option
  const updateQtyHandler = (
    product: string,
    name: string,
    image: string,
    price: number,
    countInStock: number,
    qty: number,
  ) => {
    dispatch(
      addToCart({
        product,
        name,
        image,
        price,
        countInStock,
        qty,
      }),
    );
  };

  // Triggers array filtration to drop the product item entry entirely
  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-10">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center bg-white">
          <p className="text-sm text-gray-500 mb-4">
            Your shopping cart is completely empty.
          </p>
          <Link
            href="/"
            className="text-sm font-semibold text-red-600 hover:text-red-500"
          >
            Go Shopping &rarr;
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Left Side: Cart Items List */}
          <section className="lg:col-span-7 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <ul role="list" className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={item.product}
                  className="flex py-6 first:pt-0 last:pb-0"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link
                            href={`/product/${item.product}`}
                            className="hover:text-gray-700"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Delete Product Icon Action Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      {/* Sub-item Qty Modification Dropdown */}
                      <div className="flex items-center gap-x-2 text-sm">
                        <label
                          htmlFor={`quantity-${item.product}`}
                          className="text-gray-500"
                        >
                          Qty:
                        </label>
                        <select
                          id={`quantity-${item.product}`}
                          value={item.qty}
                          onChange={(e) =>
                            updateQtyHandler(
                              item.product,
                              item.name,
                              item.image,
                              item.price,
                              item.countInStock,
                              Number(e.target.value),
                            )
                          }
                          className="rounded-md border border-gray-300 bg-white py-1 px-2 text-sm font-medium shadow-sm focus:border-black focus:outline-none"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <p className="text-sm font-medium text-gray-900">
                        Total: ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Right Side: Price Breakdown Summary Panel */}
          <section className="mt-16 rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-4">
              Order Summary
            </h2>

            <dl className="mt-6 space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">
                  ${itemsPrice.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <dt>Shipping Estimate</dt>
                <dd className="font-medium text-gray-900">
                  ${shippingPrice.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <dt>Tax Estimate (15%)</dt>
                <dd className="font-medium text-gray-900">
                  ${taxPrice.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-bold text-gray-900">
                <dt>Order Total</dt>
                <dd>${totalPrice.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-md border border-transparent bg-black py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
