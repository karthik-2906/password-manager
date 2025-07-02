'use client'

import { ThemeProvider } from 'next-themes'
import { PasswordManagerProvider } from '@/app/libs/PasswordManagerContext'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <PasswordManagerProvider>
                {children}
            </PasswordManagerProvider>
        </ThemeProvider>
    )
}
