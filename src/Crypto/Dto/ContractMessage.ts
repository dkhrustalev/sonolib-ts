import {BigInteger} from "big-integer";
import {BigIntToBufferLE} from "../utils";
import * as bs58 from 'bs58';

export class ContractMessageDto<T> {

    sender: string;         // [26]byte
    address: string | null; // [26]byte
    payload: string;        // []byte
    value: T;               // uint64
    commission: T;          // uint64

    constructor(sender: string, address: string | null, payload: string, value: T, commission: T) {
        this.sender = sender;
        this.address = address;
        this.payload = payload;
        this.commission = commission;
        this.value = value;
    }
}

export class ContractMessage extends ContractMessageDto<BigInteger> {

    toBytes(): Buffer {
        const sender = bs58.decode(this.sender); // Buffer.from(this.sender, 'hex');
        const payload = Buffer.from(this.payload, 'hex');
        const value = BigIntToBufferLE(this.value, 8);
        const commission = BigIntToBufferLE(this.commission, 8);

        let addr = Buffer.alloc(0);
        if (this.address != null) {
            addr = bs58.decode(this.address); // Buffer.from(this.address, 'hex');
        }

        return Buffer.concat([sender, payload, value, commission, addr]);
    }

}
