"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingBag size={60} className="mx-auto text-gray-200 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h1>
        <p className="text-gray-400 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-full transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  const subtotal = total();
  const freeDelivery = subtotal >= 3000;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({items.length} item{items.length > 1 ? "s" : ""})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => {
            const price = product.sale_price ?? product.price;
            return (
              <div key={product.id} className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4">
                {/* Image */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                  {product.images?.[0] ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-contain p-2" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <ShoppingBag size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link href={`/products/${product.slug}`} className="font-medium text-gray-800 hover:text-yellow-600 line-clamp-2 text-sm">
                    {product.name}
                  </Link>
                  {product.brand?.name && (
                    <p className="text-xs text-gray-400 mt-0.5">{product.brand.name}</p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-sm">
                      <button onClick={() => updateQty(product.id, quantity - 1)} className="px-3 py-1.5 hover:bg-gray-50">−</button>
                      <span className="px-3 py-1.5 min-w-[2.5rem] text-center">{quantity}</span>
                      <button onClick={() => updateQty(product.id, quantity + 1)} className="px-3 py-1.5 hover:bg-gray-50">+</button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">Rs. {(price * quantity).toLocaleString()}</span>
                      <button onClick={() => removeItem(product.id)} className="text-gray-300 hover:text-red-400 transition-colors" aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-xl p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={freeDelivery ? "text-green-600 font-medium" : "text-gray-600"}>
                  {freeDelivery ? "FREE" : "Rs. 200"}
                </span>
              </div>
              {!freeDelivery && (
                <p className="text-xs text-yellow-600">
                  Add Rs. {(3000 - subtotal).toLocaleString()} more for free delivery!
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>Rs. {(subtotal + (freeDelivery ? 0 : 200)).toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl text-center transition-colors"
            >
              Proceed to Checkout
            </Link>

            <Link href="/products" className="block text-center text-sm text-gray-400 hover:text-yellow-500 mt-3">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
