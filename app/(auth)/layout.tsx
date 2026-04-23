import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple header */}
      <header className="bg-white border-b border-gray-100 h-14 flex items-center">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Image src="/logo.PNG" alt="Assembly Line" width={110} height={44} className="h-11 w-auto object-contain" priority />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Assembly Line
      </footer>
    </div>
  );
}
