'use client';

import Link from "next/link";
import { SlSettings } from "react-icons/sl";
import { LuFileUp, LuFileDown } from "react-icons/lu";
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
import { isDownloadDisabled } from "@/app/libs/fileHandlers";

type SettingsDropdownProps = {
    records: PasswordRecord[];
    settingsDisabled?:boolean;
};

export default function SettingsDropdown({ records, settingsDisabled = false }: SettingsDropdownProps) {
    const disabled = isDownloadDisabled(records);
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
                        <LuFileUp />
                        Upload
                        <DropdownMenuShortcut>Ctrl+U</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className={`gap-1 ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                        disabled={disabled}
                        onClick={() => {
                            openPasswordDialog({ action: 'download' });
                        }}
                    >
                        <LuFileDown />
                        Download
                        <DropdownMenuShortcut>Ctrl+D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="mailto:karthik29062000@gmail.com" className="cursor-pointer w-full">Contact</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}