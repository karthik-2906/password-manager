'use client';

import { useState, useEffect } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PasswordDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (password: string) => Promise<boolean>;
    action: 'download' | 'upload';
};

export default function PasswordDialog({ open, onClose, onSubmit, action }: PasswordDialogProps) {
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
            if (action === 'download') {
                setError("Password is required to download the file.");
            }
            onClose();
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
                        {action === 'download' ? 'Set a Master Password' : 'Enter Master Password'}
                    </DialogTitle>

                    <DialogDescription>
                        {action === 'download'
                            ? 'This password will secure your file. You’ll need it to open the file later, and it cannot be recovered if lost.'
                            : 'Enter the password used to secure this file. You’ll need the exact password it was encrypted with.'}
                    </DialogDescription>
                </DialogHeader>

                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <Alert variant="destructive">
                        <IoAlertCircleOutline />
                        <AlertTitle>Invalid password. Please retry</AlertTitle>
                    </Alert>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" className="cursor-pointer" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleConfirm} className="cursor-pointer">Confirm</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}