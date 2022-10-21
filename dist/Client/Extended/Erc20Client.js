"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erc20Client = void 0;
var Dtos_1 = require("../../Dtos");
var bigInt = require("big-integer");
var bs58 = require("bs58");
var Crypto_1 = require("../../Crypto");
var Contracts_1 = require("../../Contracts");
var Erc20Client = /** @class */ (function () {
    function Erc20Client(baseAddress, http) {
        var _this = this;
        this.staticCall = function (contract, payload) { return __awaiter(_this, void 0, void 0, function () {
            var params, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        params = {
                            address: contract,
                            payload: payload,
                        };
                        return [4 /*yield*/, this.http.post(this.baseAddress + "/contract/static_call", params, { 'headers': { 'Content-Type': 'application/json' } })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                consumedFee: bigInt(data.consumedFee),
                                result: data.result,
                            }];
                    case 2:
                        e_1 = _a.sent();
                        throw e_1.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.consumedFee = function (sender, contract, payload, value, commission) {
            if (value === void 0) { value = Crypto_1.toSatoshi(0); }
            if (commission === void 0) { commission = Crypto_1.toSatoshi(0); }
            return __awaiter(_this, void 0, void 0, function () {
                var msg, data, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            msg = new Dtos_1.ContractMessageDto(sender, contract, payload, Number(value), Number(commission));
                            return [4 /*yield*/, this.http.post(this.baseAddress + "/contract/consumed_fee", msg, { 'headers': { 'Content-Type': 'application/json' } })];
                        case 1:
                            data = (_a.sent()).data;
                            return [2 /*return*/, {
                                    consumedFee: bigInt(data.consumedFee),
                                    result: data.result,
                                }];
                        case 2:
                            e_2 = _a.sent();
                            throw e_2.response.data.message;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.getTransferFee = function (sender, contract, address, amount) { return __awaiter(_this, void 0, void 0, function () {
            var addr, am, payload, data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        addr = bs58.decode(address).toString('hex');
                        am = Crypto_1.BigIntToBufferBE(amount, 8).toString('hex');
                        payload = Contracts_1.Erc20TransferHex + addr + am;
                        return [4 /*yield*/, this.consumedFee(sender, contract, payload)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, bigInt(data.consumedFee)];
                    case 2:
                        e_3 = _a.sent();
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getTokenBalance = function (contract, address) { return __awaiter(_this, void 0, void 0, function () {
            var addr, payload, data, balance, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        addr = bs58.decode(address).toString('hex');
                        payload = Contracts_1.Erc20BalanceHex + addr;
                        return [4 /*yield*/, this.staticCall(contract, payload)];
                    case 1:
                        data = _a.sent();
                        balance = Crypto_1.readBigUInt64BE(Buffer.from(data.result, 'hex'));
                        return [2 /*return*/, {
                                address: address,
                                confirmedAmount: balance,
                                unconfirmedAmount: balance,
                            }];
                    case 2:
                        e_4 = _a.sent();
                        throw e_4.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.http = http;
        this.baseAddress = baseAddress;
    }
    return Erc20Client;
}());
exports.Erc20Client = Erc20Client;
