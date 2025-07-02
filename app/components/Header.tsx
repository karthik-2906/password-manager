'use client'

import Link from "next/link";
import { usePasswordManagerContext } from "@/app/libs/PasswordManagerContext";
import { BsShieldLockFill } from "react-icons/bs";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import SettingsDropdown from "@/app/components/SettingsDropdown";

type HeaderProprs = {
    settingsDisabled?: boolean;
};

export default function Header({ settingsDisabled = false }: HeaderProprs) {
    const passwordManager = usePasswordManagerContext();

    return (
        <header>
            <div className="flex justify-between items-center h-16 sm:h-18">
                <div className="flex gap-4">
                    <Link href='/' className="flex gap-2 items-center">
                        <BsShieldLockFill size={20} />
                        <h2 className="font-semibold text-xl">Password Manager</h2>
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <ThemeSwitcher />
                    <SettingsDropdown records={passwordManager.records} settingsDisabled={settingsDisabled} />
                </div>
            </div>
        </header>
    );
}
