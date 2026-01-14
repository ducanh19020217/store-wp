import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <main className="min-h-[60vh]">
          {children}
        </main>
        <Footer />

        {/* Floating Contact Buttons */}
        <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-4">
          <a href={siteConfig.social.zalo} target="_blank" rel="noreferrer" className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center w-14 h-14">
            <span className="font-bold text-xs">Zalo</span>
          </a>
          <a href={`tel:${siteConfig.contact.phoneRaw}`} className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center w-14 h-14">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}
