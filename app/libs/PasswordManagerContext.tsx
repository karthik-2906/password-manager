'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PasswordRecord } from '@/app/libs/types';
import { handleSave } from '@/app/libs/fileHandlers';
import { decryptData } from '@/app/libs/encryption';
import PasswordDialog from '@/app/components/MasterPasswordDialog';
import { toast } from 'sonner';

type PasswordManagerContextType = {
    records: PasswordRecord[];
    recordsVersion: number;
    showPasswords: Record<string, boolean>;
    getFaviconUrl: (url: string) => string | null;
    updateRecords: (newRecords: PasswordRecord[]) => void;
    togglePasswordVisibility: (id: string) => void;
    handleDelete: (id: string) => void;
    handleEdit: (id: string, updated: PasswordRecord) => void;
    handleAdd: (newRecord: PasswordRecord) => void;
    openPasswordDialog: (config: {
        action: 'upload' | 'save';
        encryptedContent?: string;
        onSuccess?: (records?: PasswordRecord[]) => void;
    }) => void;
};

const PasswordManagerContext = createContext<PasswordManagerContextType | null>(null);

export function PasswordManagerProvider({ children }: { children: React.ReactNode }) {
    const [records, setRecords] = useState<PasswordRecord[]>([]);
    const [recordsVersion, setRecordsVersion] = useState(0);
    const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<'upload' | 'save'>('upload');
    const [pendingEncryptedContent, setPendingEncryptedContent] = useState<string | null>(null);
    const [onSuccessCallback, setOnSuccessCallback] = useState<((records?: PasswordRecord[]) => void) | null>(null);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (records.length > 0) {
                e.preventDefault();
                e.returnValue = ''; // Required for Chrome to show the prompt
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [records]);

    const openPasswordDialog = ({
        action,
        encryptedContent,
        onSuccess,
    }: {
        action: 'upload' | 'save';
        encryptedContent?: string;
        onSuccess?: (records?: PasswordRecord[]) => void;
    }) => {
        setModalAction(action);
        setPasswordModalOpen(true);
        if (encryptedContent) setPendingEncryptedContent(encryptedContent);
        if (onSuccess) setOnSuccessCallback(() => onSuccess);
    };

    const handlePasswordSubmit = async (password: string): Promise<boolean> => {
        if (modalAction === 'save') {
            await handleSave(records, 'passwords.enc', password);
            return true;
        }

        if (modalAction === 'upload' && pendingEncryptedContent) {
            try {
                const decrypted = await decryptData(pendingEncryptedContent, password);
                if (!decrypted) throw new Error('Invalid password');
                updateRecords(decrypted);
                onSuccessCallback?.(decrypted);
                setPendingEncryptedContent(null);
                return true;
            } catch {
                return false;
            }
        }

        return false;
    };

    const getFaviconUrl = (url: string): string | null => {
        try {
            const hostname = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;
        } catch {
            return null;
        }
    };

    const updateRecords = (newRecords: PasswordRecord[]) => {
        setRecords(newRecords);
        setRecordsVersion(prev => prev + 1);
        const newShowPasswords = newRecords.reduce((acc, record) => {
            acc[record.id] = false;
            return acc;
        }, {} as Record<string, boolean>);
        setShowPasswords(newShowPasswords);
    };

    const togglePasswordVisibility = (id: string) => {
        setShowPasswords(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleAdd = (newRecord: PasswordRecord) => {
        const recordToAdd = { ...newRecord, id: uuidv4() };
        setRecords(prev => [...prev, recordToAdd]);
        setRecordsVersion(prev => prev + 1);
        setShowPasswords(prev => ({
            ...prev,
            [recordToAdd.id]: false,
        }));
        toast.success('Password added successfully');
    };

    const handleDelete = (id: string) => {
        const index = records.findIndex(r => r.id === id);
        if (index === -1) return;

        const deletedRecord = records[index];
        setRecords(prev => prev.filter(r => r.id !== id));
        setRecordsVersion(prev => prev + 1);
        setShowPasswords(prev => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });

        toast('Record has been deleted', {
            action: {
                label: 'Undo',
                onClick: () => {
                    setRecords(prev => {
                        const updated = [...prev];
                        updated.splice(index, 0, deletedRecord);
                        return updated;
                    });
                    setRecordsVersion(prev => prev + 1);
                    setShowPasswords(prev => ({
                        ...prev,
                        [id]: false,
                    }));
                },
            },
        });
    };

    const handleEdit = (id: string, updatedRecord: PasswordRecord) => {
        setRecords(prev =>
            prev.map(record => (record.id === id ? updatedRecord : record))
        );
        setRecordsVersion(prev => prev + 1);
        toast.success('Password updated successfully');
    };

    return (
        <PasswordManagerContext.Provider
            value={{
                records,
                recordsVersion,
                showPasswords,
                getFaviconUrl,
                updateRecords,
                togglePasswordVisibility,
                handleDelete,
                handleEdit,
                handleAdd,
                openPasswordDialog,
            }}
        >
            {children}

            <PasswordDialog
                open={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                onSubmit={handlePasswordSubmit}
                action={modalAction}
            />
        </PasswordManagerContext.Provider>
    );
}

export function usePasswordManagerContext() {
    const context = useContext(PasswordManagerContext);
    if (!context) {
        throw new Error('usePasswordManagerContext must be used within a PasswordManagerProvider');
    }
    return context;
}
