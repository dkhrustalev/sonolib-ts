"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erc20Transfer = exports.Erc20BalanceHex = exports.Erc20TransferHex = void 0;
var Crypto_1 = require("../Crypto");
var bs58 = require("bs58");
exports.Erc20TransferHex = "5d359fbd";
exports.Erc20BalanceHex = "70a08231";
var Erc20Transfer = /** @class */ (function () {
    function Erc20Transfer(sodium) {
        this._txRequest = new Crypto_1.TransactionRequest(sodium);
    }
    Erc20Transfer.prototype.addCommission = function (gasPrice) {
        this._txRequest.addCommission(gasPrice, Crypto_1.toBigInt(0));
        return this;
    };
    // amount = commission in sono from transfer
    Erc20Transfer.prototype.addSender = function (address, keyPair, amount, nonce) {
        this._sender = address;
        this._txRequest.addSender(address, keyPair, amount, nonce);
        return this;
    };
    // amount of tokens
    // commission in SONO
    Erc20Transfer.prototype.addTransfer = function (contract, address, amount, commission) {
        var addr = bs58.decode(address).toString('hex');
        var am = Crypto_1.BigIntToBufferBE(amount, 8).toString('hex');
        var payload = exports.Erc20TransferHex + addr + am;
        this._txRequest.addContractExecution(this._sender, contract, payload, Crypto_1.toBigInt(0), commission);
        return this;
    };
    Erc20Transfer.prototype.sign = function () {
        return this._txRequest.sign();
    };
    return Erc20Transfer;
}());
exports.Erc20Transfer = Erc20Transfer;
