import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Im Store",
    description: "Store app powered by NextJS + AppWrite",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-screen bg-slate-400">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
