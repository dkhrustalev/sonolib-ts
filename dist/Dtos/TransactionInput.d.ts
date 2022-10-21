/// <reference types="node" />
import { BigInteger } from "big-integer";
export declare class TransactionInputDto<T> {
    address: string;
    nonce: T;
    sign: string;
    publicKey: string;
    value: T;
    constructor(address: string, pubKey: string, value: T, nonce: T);
}
export declare class TransactionInput extends TransactionInputDto<BigInteger> {
    toBytes(): Buffer;
}
