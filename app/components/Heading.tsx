import React from "react";

interface HeadingProps {
    title?: string;
    desc?: string;
}

export default function Heading({ title, desc }: HeadingProps) {
    return (
        <div className="flex flex-col gap-1">
            {title &&
                <h2 className="text-lg font-semibold">{title}</h2>
            }
            {desc && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {desc}
                </p>
            )}
        </div>
    )
}
