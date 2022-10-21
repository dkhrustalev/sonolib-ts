import { KeysGen, TxGen } from "./index";
export declare class Crypto {
    keysGen: KeysGen;
    tx: TxGen;
    constructor(sodium: any);
    static init: () => Promise<Crypto>;
}
