import { Balance } from "../../Dtos";
import { BigInteger } from "big-integer";
import { AxiosInstance } from "axios";
import { StaticCall } from "../../Dtos/StaticCall";
export declare class Erc20Client {
    protected readonly http: AxiosInstance;
    protected readonly baseAddress: string;
    constructor(baseAddress: string, http: AxiosInstance);
    staticCall: (contract: string, payload: string) => Promise<StaticCall<BigInteger>>;
    consumedFee: (sender: string, contract: string | null, payload: string, value?: BigInteger, commission?: BigInteger) => Promise<StaticCall<BigInteger>>;
    getTransferFee: (sender: string, contract: string, address: string, amount: BigInteger) => Promise<BigInteger>;
    getTokenBalance: (contract: string, address: string) => Promise<Balance<BigInteger>>;
}
