/// <reference types="node" />
import { BigInteger } from "big-integer";
export declare class ContractMessageDto<T> {
    sender: string;
    address: string | null;
    payload: string;
    value: T;
    gas: T;
    constructor(sender: string, address: string | null, payload: string, value: T, gas: T);
}
export declare class ContractMessage extends ContractMessageDto<BigInteger> {
    toBytes(): Buffer;
}
