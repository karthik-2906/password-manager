'use client'

import { useState } from "react";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
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
import { PasswordRecord } from "@/app/libs/types";
import FormError from "@/app/components/FormError";

interface EditDialogProps {
    record: PasswordRecord;
    onEdit: (id: string, updatedRecord: PasswordRecord) => void;
}

export function EditDialog({ record, onEdit }: EditDialogProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [missingFields, setMissingFields] = useState({
        name: false,
        username: false,
        password: false,
    });

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

        const updatedRecord: PasswordRecord = {
            ...record,
            label: formData.get("name") as string,
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            url: formData.get("url") as string,
        };

        setHasSubmitted(false);
        setMissingFields({ name: false, username: false, password: false });
        onEdit(record.id, updatedRecord);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 cursor-pointer">
                    <FaEdit />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Edit Password</DialogTitle>
                    <DialogDescription>
                        Edit the details you want to change and save the updated password entry.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Website or Label *</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Website or Label"
                            defaultValue={record.label}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="url">URL</Label>
                        <Input
                            id="url"
                            name="url"
                            placeholder="URL"
                            defaultValue={record.url}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username">Username or Email *</Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Username"
                            defaultValue={record.username}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password *</Label>
                        <div className="flex gap-2">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                defaultValue={record.password}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </div>
                    </div>
                    {hasSubmitted && (missingFields.name || missingFields.username || missingFields.password) && (
                        <FormError {...missingFields} />
                    )}
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}