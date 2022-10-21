/// <reference types="node" />
export declare class Wallet {
    address: Buffer;
    Base58Address: string;
    private _publicKey;
    constructor(publicKey: Buffer);
    private static makeChecksum;
    static IsValidAddress(address: string): boolean;
    static IsValidContractAddress(address: string): boolean;
    private static isValidAddress;
    static fromSeedAsync(seed: string, path: number): Promise<import("./HDKeys").HDKeys>;
    static fromSeed(seed: string, path: number): Promise<import("./HDKeys").HDKeys>;
}
