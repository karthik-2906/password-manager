'use client';

import Header from "@/app/components/Header";
import Heading from "@/app/components/Heading";

export default function Home() {
    return (
        <>
            <Header settingsDisabled />
            <div className="mt-6 flex flex-col flex-1">
                <Heading title="How to Use" desc="This simple password manager lets you securely store, view, and manage your passwords in memory during your session. You can also download them as an encrypted file and restore them later. Follow the steps below to get started." />
                
                <ol className="list-decimal list-inside space-y-6 mt-6 text-sm font-semibold">
                    <li>
                        Add a new Password:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Click the <strong>Add</strong> button. Add details for the required fields and save the changes.
                        </span>
                    </li>

                    <li>
                        Edit a Saved Password:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Click the <strong>Edit</strong> icon on any password entry. Update any fields and save the changes.
                        </span>
                    </li>

                    <li>
                        Delete a Password:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Click the <strong>Delete</strong> icon and confirm to remove a saved password. You can undo the delete using the <strong>Undo</strong> button in the toast notification (if acted on immediately).
                        </span>
                    </li>

                    <li>
                        Download Your Passwords:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Click the <strong>Settings</strong> icon → <strong>Download</strong>. Enter a <strong>Master Password</strong> — this will be used to encrypt the file. Save the <code>.enc</code> file to your computer.<br />
                            <em className="text-red-500">Keep this Master Password safe — it cannot be recovered if lost.</em>
                        </span>
                    </li>

                    <li>
                        Upload Existing Passwords:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Click the <strong>Settings</strong> icon → <strong>Upload</strong>, or use the upload button on the empty screen. Select a <code>.enc</code> file you previously downloaded. Enter the <strong>correct Master Password</strong> used when encrypting it. Your saved passwords will be decrypted and restored.
                        </span>
                    </li>

                    <li>
                        Search Passwords:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Use the <strong>search bar</strong> to find entries by <strong>label</strong> or <strong>username</strong>. The list filters automatically as you type.
                        </span>
                    </li>

                    <li>
                        Keyboard Shortcuts:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Press <code>Ctrl + D</code> to open the <strong>Download</strong> dialog. Press <code>Ctrl + U</code> to open the <strong>Upload</strong> dialog.
                        </span>
                    </li>

                    <li>
                        Data Storage Info:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            This app <strong>does not store your data online</strong>. All data is stored <strong>in memory during the session</strong>, and you can export/import it using <code>.enc</code> files.<br />
                            <em className="text-gray-600 dark:text-gray-300">You are fully in control of your data.</em>
                        </span>
                    </li>
                </ol>
            </div>
        </>
    );
}
