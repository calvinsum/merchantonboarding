export declare class CryptoService {
    generateToken(length?: number): string;
    generateMerchantToken(): string;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    generateSecureRandom(length?: number): string;
    createHmacSignature(data: string, secret: string): string;
    verifyHmacSignature(data: string, signature: string, secret: string): boolean;
    encrypt(text: string, key: string): {
        encrypted: string;
        iv: string;
        tag: string;
    };
    decrypt(encryptedData: {
        encrypted: string;
        iv: string;
        tag: string;
    }, key: string): string;
    generateApiKey(): string;
    generateWebhookSignature(payload: string, secret: string): string;
}
