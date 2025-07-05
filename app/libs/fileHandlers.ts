import { PasswordRecord } from "@/app/libs/types";
import { encryptData } from "@/app/libs/encryption";

export function isSaveDisabled(records: PasswordRecord[]): boolean {
    return records.length === 0;
}

export function handleUpload(callback: (encryptedContent: string) => void) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".enc";
    input.onchange = async (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result as string;
            callback(content);
        };

        reader.readAsText(file);
    };

    input.click();
}

export async function handleSave(data: any, filename = 'passwords.enc', password: string) {
    try {
        const encrypted = await encryptData(data, password);
        if (!encrypted) return;

        const blob = new Blob([encrypted], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    } catch (error) {
        console.error('Error downloading encrypted file:', error);
    }
}