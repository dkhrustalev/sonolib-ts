import { AxiosInstance } from "axios";
import { Balance, Nonce, TransactionExtended } from "../Dtos";
import { BigInteger } from "big-integer";
import { TransactionRequest } from "../Crypto/TransactionRequest";
import { StaticCall } from "../Dtos/StaticCall";
import { Erc20Client } from "./Extended";
import { Block, BlockHeader, Info } from "../Crypto";
export declare class Client {
    protected readonly http: AxiosInstance;
    protected readonly baseAddress: string;
    erc20: Erc20Client;
    constructor(baseAddress: string);
    getBalance: (address: string) => Promise<Balance<BigInteger>>;
    getNonce: (address: string) => Promise<Nonce<BigInteger>>;
    validate: (tx: TransactionRequest) => Promise<boolean>;
    send: (tx: TransactionRequest) => Promise<boolean>;
    staticCall: (address: string, payload: string) => Promise<StaticCall<BigInteger>>;
    consumedFee: (sender: string, contract: string | null, payload: string, value?: BigInteger, commission?: BigInteger) => Promise<StaticCall<BigInteger>>;
    info: () => Promise<Info>;
    getHeader: (hash: string) => Promise<BlockHeader>;
    getHeaderByHeight: (height: number) => Promise<BlockHeader>;
    getBlock: (hash: string) => Promise<Block<BigInteger>>;
    getBlockByHeight: (height: number) => Promise<Block<BigInteger>>;
    getTx: (hash: string) => Promise<TransactionExtended<BigInteger>>;
}
