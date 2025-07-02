'use client';

import { useEffect, useState } from "react";
import { LuFileDown } from "react-icons/lu";
import { usePasswordManagerContext } from "@/app/libs/PasswordManagerContext";
import { handleUpload, isDownloadDisabled } from "@/app/libs/fileHandlers";
import { Button } from "@/components/ui/button";
import Header from "@/app/components/Header";
import Heading from "@/app/components/Heading";
import { Search } from "@/app/components/Search";
import { AddDialog } from "@/app/components/AddDialog";
import { AccordionList } from "@/app/components/AccordionList";

export default function Home() {
    const { records, handleAdd, openPasswordDialog } = usePasswordManagerContext();
    const downloadDisabled = isDownloadDisabled(records);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrl = e.ctrlKey || e.metaKey;

            if (isCtrl && e.key.toLowerCase() === 'u') {
                e.preventDefault();
                handleUpload((content) => {
                    openPasswordDialog({
                        action: 'upload',
                        encryptedContent: content,
                    });
                });
            }

            if (isCtrl && e.key.toLowerCase() === 'd' && !downloadDisabled) {
                e.preventDefault();
                openPasswordDialog({ action: 'download' });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [downloadDisabled, openPasswordDialog]);

    return (
        <>
            <Header />
            <div className="mt-6 flex flex-col flex-1">
                <Heading title="All Passwords" desc="Safely access and manage your passwords" />
                <div className="mt-6 flex gap-2">
                    <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <Button
                        variant='secondary'
                        className="text-xs cursor-pointer gap-1 border border-box"
                        disabled={downloadDisabled}
                        onClick={() => openPasswordDialog({ action: 'download' })}
                    >
                        <LuFileDown className="w-3 h-3" /> Download
                    </Button>
                    <AddDialog onAdd={handleAdd} records={records} />
                </div>
                <AccordionList searchQuery={searchQuery} />
            </div>
        </>
    );
}