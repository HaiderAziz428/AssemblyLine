"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Search, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Result {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  images: string[];
}

export default function SearchPanel({ isOpen, onClose }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("id,name,slug,price,sale_price,images")
        .eq("is_active", true)
        .ilike("name", `%${query}%`)
        .limit(5);
      setResults(data ?? []);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const goToProduct = (slug: string) => {
    router.push(`/products/${slug}`);
    onClose();
  };

  const goToResults = () => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") goToResults();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Desktop — slide from right */}
      <div
        className={`hidden md:flex fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <PanelContent
          inputRef={inputRef}
          query={query}
          setQuery={setQuery}
          results={results}
          loading={loading}
          onClose={onClose}
          onGoToProduct={goToProduct}
          onGoToResults={goToResults}
          onKey={handleKey}
        />
      </div>

      {/* Mobile — slide from bottom */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl shadow-2xl transition-transform duration-300 max-h-[85vh] flex flex-col ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>
        <PanelContent
          inputRef={inputRef}
          query={query}
          setQuery={setQuery}
          results={results}
          loading={loading}
          onClose={onClose}
          onGoToProduct={goToProduct}
          onGoToResults={goToResults}
          onKey={handleKey}
        />
      </div>
    </>
  );
}

function PanelContent({
  inputRef, query, setQuery, results, loading, onClose, onGoToProduct, onGoToResults, onKey,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  setQuery: (v: string) => void;
  results: Result[];
  loading: boolean;
  onClose: () => void;
  onGoToProduct: (slug: string) => void;
  onGoToResults: () => void;
  onKey: (e: React.KeyboardEvent) => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900">Search</h2>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Input */}
      <div className="px-5 py-4 flex-shrink-0">
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
          <Search size={17} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 text-xs flex-shrink-0">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-5">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={22} className="animate-spin text-yellow-500" />
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Products</p>
            <div className="space-y-1">
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onGoToProduct(p.slug)}
                  className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors text-left group"
                >
                  <div className="relative w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {p.images?.[0] && (
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-yellow-600 transition-colors">
                      {p.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {p.sale_price ? (
                        <>
                          <span className="font-semibold text-gray-900">Rs. {p.sale_price.toLocaleString()}</span>
                          <span className="line-through ml-1.5 text-xs">Rs. {p.price.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="font-semibold text-gray-900">Rs. {p.price.toLocaleString()}</span>
                      )}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {!loading && query && results.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No products found for &quot;{query}&quot;</p>
        )}

        {!query && (
          <p className="text-sm text-gray-400 text-center py-8">Start typing to search products...</p>
        )}
      </div>

      {/* Footer CTA */}
      {query.trim() && (
        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onGoToResults}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            See all results <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
