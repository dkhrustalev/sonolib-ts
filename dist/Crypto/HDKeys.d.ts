/// <reference types="node" />
import { Wallet } from './index';
import { KeyPair } from "libsodium-wrappers-sumo";
export declare class HDKeys {
    privateKey: string;
    publicKey: string;
    _keyPair: KeyPair;
    constructor(keyPair: KeyPair);
    toWallet: () => Wallet;
    sign: (sodium: any, data: Buffer) => Buffer;
}
declare type Hex = string;
declare type Path = string;
declare type Keys = {
    key: Buffer;
    chainCode: Buffer;
};
export declare const getMasterKeyFromSeed: (seed: any) => {
    key: Buffer;
    chainCode: Buffer;
};
export declare const CKDPriv: ({ key, chainCode }: Keys, index: number) => Keys;
export declare const derivePath: (path: Path, seed: Hex) => Keys;
export declare const isValidPath: (path: string) => boolean;
export declare const pathRegex: RegExp;
export declare const replaceDerive: (val: string) => string;
export {};
