/// <reference types="node" />
import { BigInteger } from "big-integer";
import { TransferDto } from "./Transfer";
export declare class StakeDto<T> extends TransferDto<T> {
    nodeId: string;
    constructor(address: string, value: T, nodeId: string);
}
export declare class Stake extends StakeDto<BigInteger> {
    toBytes(): Buffer;
}
