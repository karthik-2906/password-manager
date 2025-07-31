'use client';

import { useState, useEffect } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PasswordDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (password: string) => Promise<boolean>;
    action: 'save' | 'upload';
};

export default function PasswordDialog({ open, onClose, onSubmit, action }: PasswordDialogProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) {
            setPassword("");
            setError("");
        }
    }, [open]);

    const handleConfirm = async () => {
        const trimmed = password.trim();

        if (!trimmed) {
            setError(
                action === 'save'
                    ? "Password is required to save the file."
                    : "Please enter a password to open the file."
            );
            return;
        }

        const success = await onSubmit(trimmed);
        if (!success) {
            setError("Failed to decrypt file. Please try again.");
        } else {
            setError("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {action === 'save' ? 'Set a Master Password' : 'Enter Master Password'}
                    </DialogTitle>

                    <DialogDescription>
                        {action === 'save'
                            ? 'This password will secure your file. You’ll need it to open the file later, and it cannot be recovered if lost.'
                            : 'Enter the password used to secure this file. You’ll need the exact password it was encrypted with.'}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleConfirm();
                    }}
                >
                    <div className="flex gap-2">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    {error && (
                        <Alert variant="destructive" className="mt-2">
                            <IoAlertCircleOutline />
                            <AlertTitle>Invalid password. Please retry</AlertTitle>
                        </Alert>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="button" variant="outline" className="cursor-pointer" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="cursor-pointer">Confirm</Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    );
}