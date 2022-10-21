"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxGen = void 0;
var TransactionRequest_1 = require("./TransactionRequest");
var Contracts_1 = require("../Contracts");
var TxGen = /** @class */ (function () {
    function TxGen(sodium) {
        this.sodium = sodium;
    }
    TxGen.prototype.generateTx = function () {
        return new TransactionRequest_1.TransactionRequest(this.sodium);
    };
    TxGen.prototype.generateErc20Transfer = function () {
        return new Contracts_1.Erc20Transfer(this.sodium);
    };
    return TxGen;
}());
exports.TxGen = TxGen;
