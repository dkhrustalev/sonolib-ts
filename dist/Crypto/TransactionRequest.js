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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRequest = void 0;
var Dtos_1 = require("../Dtos");
var bigInt = require("big-integer");
var _ = require("lodash");
var index_1 = require("./index");
var utils_1 = require("./utils");
var Dtos_2 = require("../Dtos");
var TransactionRequest = /** @class */ (function (_super) {
    __extends(TransactionRequest, _super);
    function TransactionRequest(sodium) {
        var _this = _super.call(this) || this;
        _this._sodium = sodium;
        _this.version = utils_1.TxVersion;
        _this.inputs = [];
        _this._signers = {};
        _this.type = Dtos_2.TransactionType.Account;
        return _this;
    }
    TransactionRequest.prototype.generateHash = function () {
        var payload = this.toBytes();
        return utils_1.doubleSha256(payload);
    };
    TransactionRequest.prototype.addCommission = function (gasPrice, transferCommission) {
        this.gasPrice = gasPrice;
        this._transferCommission = transferCommission;
        return this;
    };
    TransactionRequest.prototype.toBytes = function () {
        var _a, _b, _c, _d;
        var payload = Buffer.alloc(8); // 4 + 4
        payload.writeUInt32LE(this.type, 0); // 4 bytes
        payload.writeUInt32LE(this.version, 4); // 4 bytes
        var gasPrice = index_1.BigIntToBufferLE(this.gasPrice, 8);
        var inputs = ((_a = this.inputs) === null || _a === void 0 ? void 0 : _a.reduce(function (res, item) {
            return Buffer.concat([res, item.toBytes()]);
        }, Buffer.alloc(0))) || Buffer.alloc(0);
        var transfers = ((_b = this.transfers) === null || _b === void 0 ? void 0 : _b.reduce(function (res, item) {
            return Buffer.concat([res, item.toBytes()]);
        }, Buffer.alloc(0))) || Buffer.alloc(0);
        var messages = ((_c = this.messages) === null || _c === void 0 ? void 0 : _c.reduce(function (res, item) {
            return Buffer.concat([res, item.toBytes()]);
        }, Buffer.alloc(0))) || Buffer.alloc(0);
        var stakes = ((_d = this.stakes) === null || _d === void 0 ? void 0 : _d.reduce(function (res, item) {
            return Buffer.concat([res, item.toBytes()]);
        }, Buffer.alloc(0))) || Buffer.alloc(0);
        return Buffer.concat([payload, gasPrice, inputs, transfers, messages, stakes]);
    };
    TransactionRequest.prototype.validateValue = function (commission) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        var transfersValue = ((_a = this.transfers) === null || _a === void 0 ? void 0 : _a.reduce(function (sum, cur) {
            return sum.plus(cur.value);
        }, bigInt(0))) || bigInt(0);
        var stakesValue = ((_b = this.stakes) === null || _b === void 0 ? void 0 : _b.reduce(function (sum, cur) {
            return sum.plus(cur.value);
        }, bigInt(0))) || bigInt(0);
        var messagesValue = ((_c = this.messages) === null || _c === void 0 ? void 0 : _c.reduce(function (sum, cur) {
            return sum.plus(cur.value).plus(cur.gas.multiply(_this.gasPrice));
        }, bigInt(0))) || bigInt(0);
        var len = (((_d = this.transfers) === null || _d === void 0 ? void 0 : _d.length) || 0) + (((_e = this.stakes) === null || _e === void 0 ? void 0 : _e.length) || 0);
        var outValue = commission.multiply(this.gasPrice).multiply(len);
        outValue = outValue.plus(transfersValue.plus(stakesValue).plus(messagesValue));
        var inValue = ((_f = this.inputs) === null || _f === void 0 ? void 0 : _f.reduce(function (sum, cur) {
            return sum.plus(cur.value);
        }, bigInt(0))) || bigInt(0);
        if (!inValue.equals(outValue)) {
            throw new Error("Wrong sum in transaction, inValue: " + inValue.toString() + ", outValue: " + outValue.toString());
        }
    };
    TransactionRequest.prototype.addSender = function (address, keyPair, value, nonce) {
        this.inputs = __spreadArrays(this.inputs, [new Dtos_2.TransactionInput(address, keyPair.publicKey, value, nonce)]);
        this._signers[address] = keyPair;
        return this;
    };
    TransactionRequest.prototype.addTransfer = function (address, value) {
        if (!this.transfers)
            this.transfers = [];
        this.transfers = __spreadArrays(this.transfers, [new Dtos_2.Transfer(address, value)]);
        return this;
    };
    TransactionRequest.prototype.checkContractsData = function () {
        if (!this.messages)
            this.messages = [];
    };
    TransactionRequest.prototype.addContractCreation = function (sender, code, amount, gas) {
        this.checkContractsData();
        this.messages = __spreadArrays(this.messages, [new Dtos_2.ContractMessage(sender, null, code, amount, gas)]);
        return this;
    };
    TransactionRequest.prototype.addContractExecution = function (sender, address, code, value, gas) {
        this.checkContractsData();
        this.messages = __spreadArrays(this.messages, [new Dtos_2.ContractMessage(sender, address, code, value, gas)]);
        return this;
    };
    TransactionRequest.prototype.addStake = function (address, value, nodeId) {
        if (!this.stakes)
            this.stakes = [];
        this.stakes = __spreadArrays(this.stakes, [new Dtos_2.Stake(address, value, nodeId)]);
        return this;
    };
    TransactionRequest.prototype.validate = function () {
        this.validateValue(this._transferCommission);
    };
    TransactionRequest.prototype.sign = function () {
        var _this = this;
        this.validate();
        this.inputs.forEach(function (input) {
            var msg = _this.msgForSignUser(input);
            var key = _this._signers[input.address];
            var sigUintArray = key.sign(_this._sodium, msg);
            input.sign = Buffer.from(sigUintArray).toString('hex');
        });
        this.hash = this.generateHash();
        return this;
    };
    TransactionRequest.prototype.msgForSignUser = function (input) {
        var _a, _b, _c;
        var payload = Buffer.alloc(8); // 4 + 4
        payload.writeUInt32LE(this.type, 0); // 4 bytes
        payload.writeUInt32LE(this.version, 4); // 4 bytes
        var gasPrice = index_1.BigIntToBufferLE(this.gasPrice, 8);
        var inputPayload = input.toBytes();
        var transfers = ((_a = this.transfers) === null || _a === void 0 ? void 0 : _a.reduce(function (res, item) {
            return Buffer.concat([res, item.toBytes()]);
        }, Buffer.alloc(0))) || Buffer.alloc(0);
        var messages = ((_b = this.messages) === null || _b === void 0 ? void 0 : _b.reduce(function (res, item) {
            return Buffer.concat([res, item.toBytes()]);
        }, Buffer.alloc(0))) || Buffer.alloc(0);
        var stakes = ((_c = this.stakes) === null || _c === void 0 ? void 0 : _c.reduce(function (res, item) {
            return Buffer.concat([res, item.toBytes()]);
        }, Buffer.alloc(0))) || Buffer.alloc(0);
        return Buffer.concat([payload, gasPrice, inputPayload, transfers, messages, stakes]);
    };
    TransactionRequest.prototype.toJSON = function () {
        var _a, _b, _c, _d;
        var tx = __assign(__assign({}, _.pick(this, ['hash', 'type', 'version'])), { gasPrice: Number(this.gasPrice), inputs: (_a = this.inputs) === null || _a === void 0 ? void 0 : _a.map(function (item) { return (__assign(__assign({}, _.pick(item, ['type', 'address', 'sign', 'publicKey'])), { value: Number(item.value), nonce: Number(item.nonce) })); }), transfers: (_b = this.transfers) === null || _b === void 0 ? void 0 : _b.map(function (item) { return (__assign(__assign({}, _.pick(item, ['address'])), { value: Number(item.value) })); }), messages: (_c = this.messages) === null || _c === void 0 ? void 0 : _c.map(function (item) { return (__assign(__assign({}, _.pick(item, ['sender', 'address', 'payload'])), { value: Number(item.value), gas: Number(item.gas) })); }), stakes: (_d = this.stakes) === null || _d === void 0 ? void 0 : _d.map(function (item) { return (__assign(__assign({}, _.pick(item, ['address', 'nodeId'])), { value: Number(item.value) })); }) });
        return JSON.stringify(tx);
    };
    ;
    TransactionRequest.prototype.toHex = function () {
        var buf = this.toBytes();
        return buf.toString('hex');
    };
    return TransactionRequest;
}(Dtos_1.TransactionRequestBase));
exports.TransactionRequest = TransactionRequest;
