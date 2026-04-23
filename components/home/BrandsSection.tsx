import Link from "next/link";
import Image from "next/image";
import type { Brand } from "@/lib/types";

interface Props {
  brands: Brand[];
}

export default function BrandsSection({ brands }: Props) {
  if (!brands.length) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Brands</h2>
          <p className="text-gray-500 mt-1 text-sm">Shop from the world's best car care brands</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/products?brand=${brand.slug}`}
              className="bg-white border border-gray-200 hover:border-yellow-400 hover:shadow-md rounded-xl px-6 py-4 flex items-center justify-center transition-all duration-200 min-w-[120px]"
            >
              {brand.logo_url ? (
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  width={100}
                  height={50}
                  className="object-contain h-10 w-auto grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="font-bold text-gray-700 text-sm">{brand.name}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
