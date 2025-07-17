'use client';

import Header from "@/app/components/Header";
import Heading from "@/app/components/Heading";

export default function TermsPage() {
    return (
        <>
            <Header settingsDisabled />
            <div className="mt-6 flex flex-col flex-1">
                <Heading title="Terms & Privacy" desc="Your data, your control. This application is a client-side password manager that prioritizes your privacy and control. Below are the terms of use and details about how your data is handled." />

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    <strong>Important:</strong> This app relies entirely on your browser for encryption and storage. If your device or browser is compromised, your encrypted data and master password may be at risk. Always use this tool on secure, trusted devices.
                </p>

                <ol className="list-decimal list-inside space-y-6 mt-6 text-sm font-semibold">
                    <li>
                        No Cloud Storage:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Your data is never stored on any server or synced to the cloud. Everything stays in memory and exists only during your browser session unless you export it manually.
                        </span>
                    </li>

                    <li>
                        Session-Based Data:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            All passwords are stored temporarily in your browser's memory. Once you close or refresh the page, the data is lost unless you save it.
                        </span>
                    </li>

                    <li>
                        Encrypted Exports:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            You can export your passwords as an encrypted <code>.enc</code> file. You will be asked to set a <strong>Master Password</strong> which is used to encrypt this file securely.
                        </span>
                    </li>

                    <li>
                        Master Password Responsibility:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            You are responsible for remembering the Master Password used during export. It is not stored or recoverable. Without it, your encrypted file cannot be decrypted or restored.
                        </span>
                    </li>

                    <li>
                        Data Loss Disclaimer:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            This app does not store or backup your data. You are solely responsible for exporting your data and keeping it safe. The developer is not liable for any data loss, corruption, or forgotten passwords.
                        </span>
                    </li>

                    <li>
                        No Analytics or Tracking:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            This app does not use cookies, analytics, or any third-party tracking scripts. Your usage remains private.
                        </span>
                    </li>

                    <li>
                        Open and Transparent:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            This tool is built with transparency in mind. All encryption happens locally in your browser using secure algorithms.
                        </span>
                    </li>

                    <li>
                        Device & Browser Security:<br />
                        <span className="font-normal text-gray-600 dark:text-gray-300">
                            Since all encryption and data handling happens in your browser, if your device or browser is compromised (e.g., by malware, malicious extensions, or other attacks), your data may be at risk. Always use this app on secure, trusted devices.
                        </span>
                    </li>
                </ol>

            </div>
        </>
    );
}
