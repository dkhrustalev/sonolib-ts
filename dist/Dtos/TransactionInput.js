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
exports.TransactionInput = exports.TransactionInputDto = void 0;
var utils_1 = require("../Crypto/utils");
var bs58 = require("bs58");
var TransactionInputDto = /** @class */ (function () {
    function TransactionInputDto(address, pubKey, value, nonce) {
        this.address = address;
        this.publicKey = pubKey;
        this.value = value;
        this.nonce = nonce;
    }
    return TransactionInputDto;
}());
exports.TransactionInputDto = TransactionInputDto;
var TransactionInput = /** @class */ (function (_super) {
    __extends(TransactionInput, _super);
    function TransactionInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransactionInput.prototype.toBytes = function () {
        var addr = bs58.decode(this.address); // Buffer.from(this.address, 'hex'); // 26 bytes
        var value = utils_1.BigIntToBufferLE(this.value, 8);
        var nonce = utils_1.BigIntToBufferLE(this.nonce, 8);
        var sign = Buffer.alloc(0);
        var pubKey = Buffer.alloc(0);
        if (this.sign != null && this.publicKey != null) {
            sign = Buffer.from(this.sign, 'hex');
            pubKey = Buffer.from(this.publicKey, 'hex');
        }
        return Buffer.concat([addr, value, nonce, sign, pubKey]);
    };
    return TransactionInput;
}(TransactionInputDto));
exports.TransactionInput = TransactionInput;
