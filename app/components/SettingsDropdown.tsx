'use client';

import Link from "next/link";
import { SlSettings } from "react-icons/sl";
import { FiSave } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import { PasswordRecord } from "@/app/libs/types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePasswordManagerContext } from "@/app/libs/PasswordManagerContext";
import { handleUpload } from "@/app/libs/fileHandlers";
import { isSaveDisabled } from "@/app/libs/fileHandlers";

type SettingsDropdownProps = {
    records: PasswordRecord[];
    settingsDisabled?:boolean;
};

export default function SettingsDropdown({ records, settingsDisabled = false }: SettingsDropdownProps) {
    const disabled = isSaveDisabled(records);
    const { openPasswordDialog } = usePasswordManagerContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className='cursor-pointer'>
                    <SlSettings />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="gap-1 cursor-pointer"
                        disabled={settingsDisabled}
                        onClick={() => {
                            handleUpload((content) => {
                                openPasswordDialog({
                                    action: 'upload',
                                    encryptedContent: content,
                                });
                            });
                        }}
                    >
                        <MdOutlineFileUpload color="currentColor"/>
                        Upload
                        <DropdownMenuShortcut>Ctrl+U</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className={`gap-1 ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                        disabled={disabled}
                        onClick={() => {
                            openPasswordDialog({ action: 'save' });
                        }}
                    >
                        <FiSave color="currentColor" />
                        Save
                        <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="mailto:karthik29062000@gmail.com" target="_blank" className="cursor-pointer w-full">Contact</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}