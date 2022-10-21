/// <reference types="node" />
import { TransactionRequestBase } from "../Dtos";
import { BigInteger } from "big-integer";
import { HDKeys } from "./index";
export declare class TransactionRequest extends TransactionRequestBase {
    private readonly _sodium;
    private readonly _signers;
    private _transferCommission;
    constructor(sodium: any);
    private generateHash;
    addCommission(gasPrice: BigInteger, transferCommission: BigInteger): TransactionRequest;
    toBytes(): Buffer;
    validateValue(commission: BigInteger): void;
    addSender(address: string, keyPair: HDKeys, value: BigInteger, nonce: BigInteger): TransactionRequest;
    addTransfer(address: string, value: BigInteger): TransactionRequest;
    private checkContractsData;
    addContractCreation(sender: string, code: string, amount: BigInteger, gas: BigInteger): TransactionRequest;
    addContractExecution(sender: string, address: string, code: string, value: BigInteger, gas: BigInteger): this;
    addStake(address: string, value: BigInteger, nodeId: string): this;
    validate(): void;
    sign(): TransactionRequest;
    private msgForSignUser;
    toJSON(): string;
    toHex(): string;
}
