'use client';

import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <>
            <Separator className="mt-8" />
            <footer className="flex flex-col sm:flex-row justify-center sm:justify-between gap-2 sm:gap-0 items-center h-20 sm:h-14">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    © {new Date().getFullYear()}{" "}
                    <a
                        href="https://www.karthiksivakumar.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-700 dark:hover:text-white transition"
                    >
                        Karthik Sivakumar
                    </a>
                    . All rights reserved.
                </p>
                <div className="flex gap-2">
                    <Link
                        href="/how-to-use"
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition"
                    >
                        How to Use
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-300">|</p>
                    <Link
                        href="/terms-and-privacy"
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition"
                    >
                        Terms & Privacy
                    </Link>
                </div>
            </footer>
        </>
    );
}