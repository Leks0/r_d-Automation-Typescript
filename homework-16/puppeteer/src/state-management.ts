import { BrowserContext, Cookie } from 'puppeteer';
import * as fs from 'fs';

const cookiesFilePath = 'cookies.json';

export async function saveSession(context: BrowserContext): Promise<void> {
    const cookiesObject = await context.cookies();
    if (!fs.existsSync(cookiesFilePath)) {
        fs.writeFileSync(cookiesFilePath, JSON.stringify(cookiesObject));
    }

}

export async function restoreSession(context: BrowserContext): Promise<void> {
    let file: string;
    if (fs.existsSync(cookiesFilePath)) {
        file = fs.readFileSync(cookiesFilePath).toString();
        const parsedCookies = JSON.parse(file) as Cookie[];
        for (const cookie of parsedCookies) {
            await context.setCookie(cookie);
        }
    }
}

export async function clearSession(): Promise<void> {
    if (fs.existsSync(cookiesFilePath)) {
        fs.unlinkSync(cookiesFilePath);
    }
}
