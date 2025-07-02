"use client";

import { PiCactusThin } from "react-icons/pi";
import { LuFileUp } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { usePasswordManagerContext } from "@/app/libs/PasswordManagerContext";
import { handleUpload } from "@/app/libs/fileHandlers";

type EmptyStateProps = {
    search?: boolean;
};

export default function EmptyState({ search = false }: EmptyStateProps) {
    const { openPasswordDialog } = usePasswordManagerContext();

    return (
        <div className="flex flex-col items-center gap-2 flex-1 justify-center">
            <PiCactusThin size={120} className="text-gray-600 dark:text-gray-300" />
            <div className="text-center">
                {search ? (
                    <>
                        <div className="text-gray-600 dark:text-gray-300">No matching results found.</div>
                        <div className="text-gray-600 dark:text-gray-300">Try adjusting your search terms.</div>
                    </>
                ) : (
                    <>
                        <div className="text-gray-600 dark:text-gray-300">No passwords found.</div>
                        <div className="text-gray-600 dark:text-gray-300">
                            Add new passwords to get started, or upload an existing <code>.enc</code> file to restore your saved data.
                        </div>
                    </>
                )}
            </div>

            {!search && (
                <Button
                    variant="secondary"
                    size="sm"
                    className="mt-2 cursor-pointer border border-border"
                    onClick={() => {
                        handleUpload((content) => {
                            openPasswordDialog({
                                action: 'upload',
                                encryptedContent: content,
                            });
                        });
                    }}
                >
                    <LuFileUp />
                    Upload
                </Button>
            )}
        </div>
    );
}