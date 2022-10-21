/// <reference types="node" />
import { BigInteger } from "big-integer";
export declare const TxVersion = 1;
export declare const fromSatoshi: (value: number) => number;
export declare const toBigInt: (value: number) => BigInteger;
export declare const COMMISSION: BigInteger;
export declare const toSatoshi: (value: number) => BigInteger;
export declare const NewAddress: (publicKey: Buffer, prefix: Buffer) => string;
export declare const MakeChecksum: (payload: Buffer) => Buffer;
export declare const doubleSha256: (val: Buffer) => string;
export declare const BigIntToBufferLE: (val: BigInteger, size: number) => Buffer;
export declare const BigIntToBufferBE: (val: BigInteger, size: number) => Buffer;
export declare function getFirstAndLast(buffer: Buffer, offset: number): {
    first: number;
    last: number;
};
export declare function readBigUInt64BE(buffer: Buffer, offset?: number): BigInteger;
