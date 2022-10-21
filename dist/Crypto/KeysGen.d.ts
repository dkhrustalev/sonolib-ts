import { HDKeys } from "./HDKeys";
export declare class KeysGen {
    private sodium;
    constructor(sodium: any);
    generateRandom: () => HDKeys;
    fromPrivateKey: (privateKey: string) => HDKeys;
    fromSeed: (seed: string, path?: string) => HDKeys;
}
