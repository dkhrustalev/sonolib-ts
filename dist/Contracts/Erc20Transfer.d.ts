import { HDKeys, TransactionRequest } from "../Crypto";
import { BigInteger } from "big-integer";
export declare const Erc20TransferHex = "5d359fbd";
export declare const Erc20BalanceHex = "70a08231";
export declare class Erc20Transfer {
    private _txRequest;
    private _sender;
    constructor(sodium: any);
    addCommission(gasPrice: BigInteger): Erc20Transfer;
    addSender(address: string, keyPair: HDKeys, amount: BigInteger, nonce: BigInteger): Erc20Transfer;
    addTransfer(contract: string, address: string, amount: BigInteger, commission: BigInteger): Erc20Transfer;
    sign(): TransactionRequest;
}
