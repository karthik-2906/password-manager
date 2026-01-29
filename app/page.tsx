"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FiSave } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import { usePasswordManagerContext } from "@/app/libs/PasswordManagerContext";
import { handleUpload, isSaveDisabled } from "@/app/libs/fileHandlers";
import { Button } from "@/components/ui/button";
import Header from "@/app/components/Header";
import Heading from "@/app/components/Heading";
import { Search } from "@/app/components/Search";
import { AddDialog } from "@/app/components/AddDialog";
import { AccordionList } from "@/app/components/AccordionList";

export default function Home() {
    const { records, handleAdd, openPasswordDialog } =
        usePasswordManagerContext();
    const saveDisabled = isSaveDisabled(records);
    const saveDisabledRef = useRef(saveDisabled);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        saveDisabledRef.current = saveDisabled;

        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrl = e.ctrlKey || e.metaKey;

            if (isCtrl && e.key.toLowerCase() === "u") {
                e.preventDefault();
                handleUpload((content) => {
                    openPasswordDialog({
                        action: "upload",
                        encryptedContent: content,
                    });
                });
            }

            if (isCtrl && e.key.toLowerCase() === "s") {
                e.preventDefault();
                if (!saveDisabledRef.current) {
                    openPasswordDialog({ action: "save" });
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [saveDisabled, openPasswordDialog]);

    return (
        <>
            <Header />
            <div className="mt-4 flex flex-col flex-1">
                <div className="mb-8">
                    <p className="font-semibold">
                        A simple and secure password manager that keeps your
                        data private.
                    </p>
                    <ul className="mt-2 list-disc pl-3 space-y-2 text-sm text-black dark:text-white">
                        <li>
                            Add your passwords directly in the app — no login or
                            signup needed.
                        </li>
                        <li>
                            Once you're done, save them to a <code>.enc</code>{" "}
                            file on your device using a master password.
                        </li>
                        <li>
                            You can upload this file later to view or update
                            your passwords.
                        </li>
                        <li>
                            If you upload and make changes, you will need to
                            save again — a new file will be created.
                        </li>
                        <li>
                            If you do not save, your data will be lost when you
                            close or refresh the page.
                        </li>
                        <li>
                            All data stays in your browser — nothing is sent to
                            any server.
                        </li>
                    </ul>
                    <div className="flex gap-2 mt-4">
                        <Link href="/how-to-use">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="cursor-pointer border border-border"
                            >
                                How to Use
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => {
                                handleUpload((content) => {
                                    openPasswordDialog({
                                        action: "upload",
                                        encryptedContent: content,
                                    });
                                });
                            }}
                        >
                            <MdOutlineFileUpload />
                            Upload
                        </Button>
                    </div>
                </div>
                <Heading
                    title="All Passwords"
                    desc="Safely access and manage your passwords"
                />
                <div className="mt-6 flex gap-2">
                    <Search
                        isSaveDisabled={saveDisabled}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        variant="secondary"
                        className="text-xs cursor-pointer gap-1 border border-box"
                        disabled={saveDisabled}
                        onClick={() => openPasswordDialog({ action: "save" })}
                    >
                        <FiSave className="w-3 h-3" /> Save
                    </Button>
                    <AddDialog onAdd={handleAdd} records={records} />
                </div>
                <AccordionList searchQuery={searchQuery} />
            </div>
        </>
    );
}
