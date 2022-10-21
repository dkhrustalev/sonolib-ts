"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxObjectType = void 0;
var TxObjectType;
(function (TxObjectType) {
    TxObjectType[TxObjectType["Input"] = 0] = "Input";
    TxObjectType[TxObjectType["Transfer"] = 1] = "Transfer";
    TxObjectType[TxObjectType["Stake"] = 2] = "Stake";
    TxObjectType[TxObjectType["Message"] = 3] = "Message";
    TxObjectType[TxObjectType["TransferCommission"] = 4] = "TransferCommission";
    TxObjectType[TxObjectType["StakeCommission"] = 5] = "StakeCommission";
    TxObjectType[TxObjectType["MessageCommission"] = 6] = "MessageCommission";
})(TxObjectType = exports.TxObjectType || (exports.TxObjectType = {}));
