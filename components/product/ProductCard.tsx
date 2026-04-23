"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/types";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  const displayPrice = product.sale_price ?? product.price;
  const avgRating = product.avg_rating ?? 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <ShoppingCart size={40} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              -{discount}%
            </span>
          )}
          {product.stock <= 0 && (
            <span className="bg-gray-700 text-white text-xs font-bold px-2 py-0.5 rounded">
              Out of Stock
            </span>
          )}
          {product.is_featured && (
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        {(product.brand?.name || product.category?.name) && (
          <span className="text-xs text-gray-400 mb-1">
            {product.brand?.name ?? product.category?.name}
          </span>
        )}

        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 flex-1 mb-2 group-hover:text-yellow-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {avgRating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={12}
                className={s <= avgRating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
              />
            ))}
            <span className="text-xs text-gray-400">({product.review_count ?? 0})</span>
          </div>
        )}

        {/* Price + Cart */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="font-bold text-gray-900">
              Rs. {displayPrice.toLocaleString()}
            </span>
            {product.sale_price && (
              <span className="text-xs text-gray-400 line-through ml-1">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-black text-xs font-bold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
