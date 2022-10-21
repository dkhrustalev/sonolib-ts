"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractMessage = exports.ContractMessageDto = void 0;
var utils_1 = require("../Crypto/utils");
var bs58 = require("bs58");
var ContractMessageDto = /** @class */ (function () {
    function ContractMessageDto(sender, address, payload, value, gas) {
        this.sender = sender;
        this.address = address;
        this.payload = payload;
        this.gas = gas;
        this.value = value;
    }
    return ContractMessageDto;
}());
exports.ContractMessageDto = ContractMessageDto;
var ContractMessage = /** @class */ (function (_super) {
    __extends(ContractMessage, _super);
    function ContractMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContractMessage.prototype.toBytes = function () {
        var sender = bs58.decode(this.sender); // Buffer.from(this.sender, 'hex');
        var payload = Buffer.from(this.payload, 'hex');
        var value = utils_1.BigIntToBufferLE(this.value, 8);
        var gas = utils_1.BigIntToBufferLE(this.gas, 8);
        var addr = Buffer.alloc(0);
        if (this.address != null) {
            addr = bs58.decode(this.address); // Buffer.from(this.address, 'hex');
        }
        return Buffer.concat([sender, payload, value, gas, addr]);
    };
    return ContractMessage;
}(ContractMessageDto));
exports.ContractMessage = ContractMessage;
