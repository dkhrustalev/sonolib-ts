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
exports.Client = void 0;
var axios_1 = require("axios");
var bigInt = require("big-integer");
var Extended_1 = require("./Extended");
var Crypto_1 = require("../Crypto");
var config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    timeout: 60 * 1000,
};
var Client = /** @class */ (function () {
    function Client(baseAddress) {
        var _this = this;
        this.getBalance = function (address) { return __awaiter(_this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(this.baseAddress + "/account/" + address + "/balance")];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                address: data.address,
                                confirmedAmount: bigInt(data.confirmedAmount),
                                unconfirmedAmount: bigInt(data.unconfirmedAmount),
                            }];
                    case 2:
                        e_1 = _a.sent();
                        throw e_1.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // @TODO return
        // public getBulkWalletBalances = async(address: string[]): Promise<Balance<BigInteger>[]> => {
        // 	try {
        // 		const { data } = await this.http.get<Balance<number>[]>(`${this.uri}/wallet/balances`);
        // 		let newData: Balance<BigInteger>[] = [];
        // 		data.forEach(val => {
        // 			newData.push({
        // 				address: 			val.address,
        // 				confirmedAmount: 	bigInt(val.confirmedAmount),
        // 				unconfirmedAmount: bigInt(val.unconfirmedAmount),
        // 			} as Balance<BigInteger>)
        // 		});
        // 		return newData;
        // 	} catch (e) {
        // 		throw e.response.data.message;
        // 	}
        // };
        this.getNonce = function (address) { return __awaiter(_this, void 0, void 0, function () {
            var data, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(this.baseAddress + "/account/" + address + "/nonce")];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                confirmedNonce: bigInt(data.confirmedNonce),
                                unconfirmedNonce: bigInt(data.unconfirmedNonce),
                            }];
                    case 2:
                        e_2 = _a.sent();
                        throw e_2.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.validate = function (tx) { return __awaiter(_this, void 0, void 0, function () {
            var txJSON, data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        txJSON = tx.toJSON();
                        return [4 /*yield*/, this.http.post(this.baseAddress + "/txs/validate", txJSON, { 'headers': { 'Content-Type': 'application/json' } })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.result == 'ok'];
                    case 2:
                        e_3 = _a.sent();
                        throw e_3.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.send = function (tx) { return __awaiter(_this, void 0, void 0, function () {
            var data, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.post(this.baseAddress + "/txs/publish", tx, { 'headers': { 'Content-Type': 'application/json' } })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.result == 'ok'];
                    case 2:
                        e_4 = _a.sent();
                        throw e_4.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.staticCall = function (address, payload) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.erc20.staticCall(address, payload)];
            });
        }); };
        this.consumedFee = function (sender, contract, payload, value, commission) {
            if (value === void 0) { value = Crypto_1.toSatoshi(0); }
            if (commission === void 0) { commission = Crypto_1.toSatoshi(1000); }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.erc20.consumedFee(sender, contract, payload, value, commission)];
                });
            });
        };
        // get blockchain info
        this.info = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(this.baseAddress + "/info")];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 2:
                        e_5 = _a.sent();
                        throw e_5.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //////// blocks section
        // get header
        this.getHeader = function (hash) { return __awaiter(_this, void 0, void 0, function () {
            var data, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(this.baseAddress + "/headers/" + hash)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 2:
                        e_6 = _a.sent();
                        throw e_6.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // get header by height
        this.getHeaderByHeight = function (height) { return __awaiter(_this, void 0, void 0, function () {
            var data, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(this.baseAddress + "/headers/height/" + height)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 2:
                        e_7 = _a.sent();
                        throw e_7.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // get block
        this.getBlock = function (hash) { return __awaiter(_this, void 0, void 0, function () {
            var data, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(this.baseAddress + "/blocks/" + hash)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 2:
                        e_8 = _a.sent();
                        throw e_8.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // get block by height
        this.getBlockByHeight = function (height) { return __awaiter(_this, void 0, void 0, function () {
            var header, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getHeaderByHeight(height)];
                    case 1:
                        header = _a.sent();
                        return [2 /*return*/, this.getBlock(header.hash)];
                    case 2:
                        e_9 = _a.sent();
                        throw e_9;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // transaction
        this.getTx = function (hash) { return __awaiter(_this, void 0, void 0, function () {
            var req, data, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req = {
                            hashes: [hash],
                        };
                        return [4 /*yield*/, this.http.post(this.baseAddress + "/txs", req, { 'headers': { 'Content-Type': 'application/json' } })];
                    case 1:
                        data = (_a.sent()).data;
                        // if (data.length == 0) {
                        // 	throw "Transaction not found";
                        // }
                        return [2 /*return*/, data[0]];
                    case 2:
                        e_10 = _a.sent();
                        throw e_10.response.data.message;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.http = axios_1.default.create(config);
        this.baseAddress = baseAddress;
        this.erc20 = new Extended_1.Erc20Client(baseAddress, this.http);
    }
    return Client;
}());
exports.Client = Client;
