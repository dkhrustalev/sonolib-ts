/// <reference types="node" />
import { BigInteger } from "big-integer";
export declare class TransferDto<T> {
    address: string;
    value: T;
    constructor(address: string, value: T);
}
export declare class Transfer extends TransferDto<BigInteger> {
    toBytes(): Buffer;
}
