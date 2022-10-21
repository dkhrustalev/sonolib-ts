import { TransactionRequest } from "./TransactionRequest";
import { Erc20Transfer } from "../Contracts";
export declare class TxGen {
    private readonly sodium;
    constructor(sodium: any);
    generateTx(): TransactionRequest;
    generateErc20Transfer(): Erc20Transfer;
}
