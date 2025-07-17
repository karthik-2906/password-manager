# Minimal Password Manager

> **Security Notice:**  
> This is a frontend-only password manager. All encryption happens in the browser using AES-256.  
> There is **no backend**, **no cloud storage**, and **no server-side protection**.  
> If your device or browser is compromised — through malware, keyloggers, or malicious extensions — your data may be at risk.  
> This tool is for **educational and personal use only**, and should **not** be used to store sensitive or real-world passwords.

---

## Features

- Fully client-side — no data ever leaves your browser
- AES-256 encryption using the Web Crypto API
- Export encrypted `.enc` files using a user-defined master password
- No cloud sync, cookies, or tracking
- Session-based storage — data is lost on refresh/close unless exported

---

## Demo

Try it live: [https://password-manager-karthik-sivakumars-projects.vercel.app/](https://password-manager-karthik-sivakumars-projects.vercel.app/)

---

## How It Works

- All passwords are stored in memory only (not saved in localStorage or the cloud)
- When exporting, your data is encrypted using AES-256 with a master password you choose
- The master password is **never stored** and is required for decryption
- You can re-import the encrypted file to recover your data on the same or different device

---

## Usage

1. Add your passwords manually in the app
2. When you're done, click "Export" to download an encrypted `.enc` file
3. Choose a secure **master password** — you’ll need this to restore your data later
4. To recover your passwords, click "Import" and enter the same master password

---

## Limitations & Disclaimer

- **Frontend-only:** No backend = no cloud sync, rate limiting, or brute-force protection
- **Local storage:** Data is kept in browser memory and lost on refresh unless exported
- **Master password is not recoverable** — if you forget it, your data is permanently inaccessible
- **No backups** — you are responsible for exporting and securing your data
- **Device/browser compromise = data risk** — only use on trusted, secure environments
- **No telemetry** — no tracking, no analytics, no cookies

> This app is for learning and personal use only. The developer is not responsible for any data loss, misuse, or forgotten master passwords.

---

## Installation (Developer)

```bash
git clone https://github.com/karthik-2906/password-manager.git
cd password-manager
npm install
npm run dev