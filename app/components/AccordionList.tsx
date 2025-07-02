'use client'

import { FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { usePasswordManagerContext } from "@/app/libs/PasswordManagerContext";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditDialog } from "@/app/components/EditDialog";
import EmptyState from "@/app/components/EmptyState";
import { CopyButton } from "@/app/components/CopyButton";

type AccordionListProps = {
    searchQuery: string;
};

export function AccordionList({ searchQuery }: AccordionListProps) {
    const {
        records,
        recordsVersion,
        showPasswords,
        getFaviconUrl,
        togglePasswordVisibility,
        handleDelete,
        handleEdit
    } = usePasswordManagerContext();

    const filteredRecords = records.filter(record => {
        const labelMatch = record.label.toLowerCase().includes(searchQuery.toLowerCase());
        const usernameMatch = record.username.toLowerCase().includes(searchQuery.toLowerCase());
        return labelMatch || usernameMatch;
    });

    if (records.length === 0) {
        return <EmptyState />
    } else if (filteredRecords.length === 0) {
        return <EmptyState search />
    }

    return (
        <Accordion
            key={`accordion-${recordsVersion}`}
            type="single"
            collapsible
            className="w-full mt-6 flex flex-col gap-3"
        >
            {filteredRecords.map((record) => {
                const faviconUrl = getFaviconUrl(record.url);
                return (
                    <AccordionItem
                        key={record.id}
                        value={`item-${record.id}`}
                        className="border border-border rounded-md px-4"
                    >
                        <AccordionTrigger className="cursor-pointer">
                            <div className="flex gap-2 items-center">
                                {faviconUrl ? (
                                    <img
                                        src={faviconUrl}
                                        alt={`${record.label} icon`}
                                        className="w-6 h-6"
                                    />
                                ) : (
                                    <TbWorld className="w-6 h-6" />
                                )}
                                {record.label}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 border border-border rounded-md p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1 flex-wrap">
                                        <span className="font-medium">Email:</span>
                                        <span>{record.username}</span>
                                    </div>
                                    <CopyButton text={record.username} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1 flex-wrap">
                                        <span className="font-medium">Password:</span>
                                        <span>
                                            {showPasswords[record.id]
                                                ? record.password
                                                : "•".repeat(record.password.length)}
                                        </span>
                                    </div>
                                    <CopyButton text={record.password} />
                                </div>
                                {record.url && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1 flex-wrap">
                                            <span className="font-medium">URL:</span>
                                            <a
                                                href={record.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {record.url}
                                            </a>
                                        </div>
                                        <CopyButton text={record.url} />
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant='outline'
                                            className="flex-1 cursor-pointer"
                                        >
                                            <FaTrashAlt />
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Record?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete this password entry? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="cursor-pointer"
                                                onClick={() => handleDelete(record.id)}
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <EditDialog
                                    record={record}
                                    onEdit={handleEdit}
                                />
                                <Button
                                    variant="outline"
                                    className="flex-1 cursor-pointer gap-1"
                                    onClick={() => togglePasswordVisibility(record.id)}
                                >
                                    {showPasswords[record.id] ? <FaEyeSlash /> : <FaEye />}
                                    <span className="inline sm:hidden">{showPasswords[record.id] ? "Hide" : "Show"}</span>
                                    <span className="hidden sm:inline">
                                        {showPasswords[record.id] ? "Hide Password" : "Show Password"}
                                    </span>
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}