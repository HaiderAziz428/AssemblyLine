"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star, Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product, related }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  const avgRating = product.reviews?.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-yellow-500">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:text-yellow-500">Products</Link>
        {product.category && (
          <>
            <ChevronRight size={14} />
            <Link href={`/products?category=${product.category.slug}`} className="hover:text-yellow-500">
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight size={14} />
        <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3">
            {product.images?.[activeImg] ? (
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                <ShoppingCart size={60} />
              </div>
            )}
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${i === activeImg ? "border-yellow-500" : "border-gray-200"}`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}

          {product.video_url && (
            <div className="mt-4 rounded-xl overflow-hidden">
              <video src={product.video_url} controls className="w-full rounded-xl" />
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.brand && (
            <Link
              href={`/products?brand=${product.brand.slug}`}
              className="text-yellow-600 text-sm font-medium hover:underline"
            >
              {product.brand.name}
            </Link>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1 mb-3">{product.name}</h1>

          {/* Rating */}
          {avgRating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className={s <= Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{avgRating.toFixed(1)} ({product.reviews?.length ?? 0} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              Rs. {(product.sale_price ?? product.price).toLocaleString()}
            </span>
            {product.sale_price && (
              <span className="text-lg text-gray-400 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 font-medium">✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-sm text-red-500 font-medium">✗ Out of Stock</span>
            )}
          </div>

          {/* Qty + Add to Cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2.5 hover:bg-gray-50 text-lg font-medium"
                  aria-label="Decrease quantity"
                >−</button>
                <span className="px-4 py-2.5 min-w-[3rem] text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-2.5 hover:bg-gray-50 text-lg font-medium"
                  aria-label="Increase quantity"
                >+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button className="p-3 border border-gray-200 rounded-xl hover:border-red-400 hover:text-red-400 transition-colors" aria-label="Add to wishlist">
                <Heart size={20} />
              </button>
            </div>
          )}

          {/* Buy now */}
          {product.stock > 0 && (
            <Link
              href="/checkout"
              onClick={() => addItem(product, qty)}
              className="block w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors text-center mb-6"
            >
              Buy Now — Cash on Delivery
            </Link>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-1.5"><Truck size={15} className="text-yellow-500" /> Free delivery above Rs. 3,000</div>
            <div className="flex items-center gap-1.5"><RotateCcw size={15} className="text-yellow-500" /> 7-day returns</div>
            <div className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-yellow-500" /> Genuine product</div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line">{product.description}</div>
        </div>
      )}

      {/* Reviews */}
      {(product.reviews?.length ?? 0) > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews?.map((review) => (
              <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className={s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                {review.comment && <p className="text-sm text-gray-600">{review.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
