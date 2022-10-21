/// <reference types="node" />
export declare class Encrypting {
    private readonly password;
    constructor(password: string);
    encrypt: (data: string, salt: Buffer | null) => string;
    decrypt(data: string): string;
    private createCipher;
    private createDecipher;
    private createCryptoFunc;
    private hash;
    static hash2Salt(data: string): string;
    static doubleSha256(val: any): string;
}
