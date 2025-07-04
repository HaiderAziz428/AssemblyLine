import { MapPin, Settings, Wrench } from "lucide-react";
import GoogleMap from "./GoogleMap";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-12 pb-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="max-w-md">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2">
                {/* Gear icon with wrench */}
                <div className="absolute inset-0 bg-gold-500 rounded-full flex items-center justify-center">
                  <Settings className="h-6 w-6 text-navy-900 absolute" />
                  <Wrench className="h-5 w-5 text-navy-900 absolute transform rotate-45" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gold-500 leading-none font-['Impact']">
                  ASSEMBLY LINE
                </span>
                <span className="text-sm font-medium text-gold-300 leading-none font-['Impact']">
                  AUTO REPAIR
                </span>
              </div>
            </div>
            <p className="text-zinc-400 mb-4">
              Professional automotive services with cutting-edge technology and
              expert technicians for all your vehicle needs.
            </p>
            <div className="flex items-start gap-2 group">
              <MapPin className="h-5 w-5 mt-1 text-zinc-400 group-hover:text-gold-500 transition-colors" />
              <p className="text-zinc-400 group-hover:text-gold-500 transition-colors">
                <a
                  href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x393b3500731bacab:0x22f56a195b297de7?entry=s&sa=X&ved=1t:8290&hl=en-GB&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-500 transition-colors"
                >
                  Assembly line 5 marla scheme MPS road, Multan
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-zinc-400 hover:text-gold-400 transition-colors cursor-pointer">
                    Electrical Services
                  </span>
                </li>
                <li>
                  <span className="text-zinc-400 hover:text-gold-400 transition-colors cursor-pointer">
                    Mechanical Repairs
                  </span>
                </li>
                <li>
                  <span className="text-zinc-400 hover:text-gold-400 transition-colors cursor-pointer">
                    AC Service & Repair
                  </span>
                </li>
                <li>
                  <span className="text-zinc-400 hover:text-gold-400 transition-colors cursor-pointer">
                    Oil Change Service
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                Working Hours
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-zinc-400">
                  <span>Monday - Sunday:</span>
                  <span>9:00 AM - 9:00 PM</span>
                </li>

                <li className="flex justify-between text-zinc-400">
                  <span>Friday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/1Ad9eKQJCU/?mibextid=wwXIfr "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navy-800 hover:bg-gold-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/assemblyline.workshop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navy-800 hover:bg-gold-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@assemblyline_?_t=ZS-8x1tCK2GOXI&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navy-800 hover:bg-gold-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">TikTok</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
