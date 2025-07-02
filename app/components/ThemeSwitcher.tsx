'use client';

import { FiSun, FiMoon } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
            {isDark ? <FiSun /> : <FiMoon />}
        </Button>
    );
}
