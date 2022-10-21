import { BigInteger } from "big-integer";
import { TransactionInput, TransactionInputDto } from "./TransactionInput";
import { Transfer, TransferDto } from "./Transfer";
import { Stake, StakeDto } from "./Stake";
import { TransactionType } from "./TransactionType";
import { ContractMessage, ContractMessageDto } from "./ContractMessage";
export declare class TransactionRequestDto<T> {
    hash: string;
    type: TransactionType;
    version: number;
    inputs: TransactionInputDto<T>[];
    transfers: TransferDto<T>[];
    messages: ContractMessageDto<T>[];
    stakes: StakeDto<T>[];
    gasPrice: BigInteger;
    constructor();
}
export declare class TransactionRequestBase extends TransactionRequestDto<BigInteger> {
    inputs: TransactionInput[];
    transfers: Transfer[];
    messages: ContractMessage[];
    stakes: Stake[];
}
