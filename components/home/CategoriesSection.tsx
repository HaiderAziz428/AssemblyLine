import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";

interface Props {
  categories: Category[];
}

export default function CategoriesSection({ categories }: Props) {
  if (!categories.length) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-500 mt-1 text-sm">Find exactly what your car needs</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-yellow-400 hover:shadow-md transition-all duration-200"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden group-hover:bg-yellow-50 transition-colors">
                {cat.image_url ? (
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-2xl">🛒</span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-600 text-center transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
