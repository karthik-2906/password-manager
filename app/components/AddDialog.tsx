'use client'

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { GoPlus } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PasswordRecord } from "@/app/libs/types";
import { validatePasswordForm } from "@/app/libs/formValidator";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormError from "@/app/components/FormError";

interface AddDialogProps {
    onAdd: (newRecord: PasswordRecord) => void;
    records: PasswordRecord[];
}

export function AddDialog({ onAdd, records }: AddDialogProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [missingFields, setMissingFields] = useState<{
        name: boolean;
        username: boolean;
        password: boolean;
    }>({ name: true, username: true, password: true });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSubmitted(true);

        const formData = new FormData(e.currentTarget);
        const result = validatePasswordForm(formData);

        const newMissing = {
            name: !result.name,
            username: !result.username,
            password: !result.password,
        };

        setMissingFields(newMissing);

        if (newMissing.name || newMissing.username || newMissing.password) {
            return;
        }
        const newRecord: PasswordRecord = {
            id: uuidv4(),
            label: formData.get("name") as string,
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            url: formData.get("url") as string,
        };

        setHasSubmitted(false);
        setMissingFields({ name: false, username: false, password: false });
        onAdd(newRecord);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="text-xs cursor-pointer gap-1">
                    <GoPlus />
                    <span className="sm:hidden">Add</span>
                    <span className="hidden sm:inline">Add New Password</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Password</DialogTitle>
                    <DialogDescription>
                        Enter the necessary information to create a new password and save.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Website or Label *</Label>
                        <Input id="name-1" name="name" placeholder="Website or Label" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="url-1">URL</Label>
                        <Input id="url-1" name="url" placeholder="URL" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Username or Email *</Label>
                        <Input id="username-1" name="username" placeholder="Username" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password-1">Password *</Label>
                        <div className="flex gap-2">
                            <Input
                                id="password-1"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                type="button"
                                className="cursor-pointer"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </div>
                    </div>
                    {hasSubmitted && (missingFields.name || missingFields.username || missingFields.password) && (
                        <FormError {...missingFields} />
                    )}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">Add Password</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
