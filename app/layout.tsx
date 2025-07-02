import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: "Password Manager",
    description: "A secure, minimal password manager built with Next.js and Tailwind CSS.",
    keywords: ["password manager", "Next.js", "secure vault", "open source", "encryption", "minimal password manager", "free password manager"],
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "Password Manager",
        description: "Safely manage your passwords in a secure, lightweight web app.",
        url: "https://password-manager-karthik-sivakumars-projects.vercel.app/",
        siteName: "Password Manager",
        type: "website",
    },
    viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>
                    <div className="flex flex-col min-h-screen mx-5 xl:mx-auto xl:max-w-[1248px]">
                        {children}
                        <Toaster position="top-center" visibleToasts={1} style={{ fontFamily: 'inherit' }} />
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
