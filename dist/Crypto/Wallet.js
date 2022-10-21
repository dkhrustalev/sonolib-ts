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
exports.Wallet = void 0;
var crypto = require("crypto");
var bs58 = require("bs58");
var Crypto_1 = require("./Crypto");
var accountVersion = Buffer.from(new Uint8Array([14, 48]));
var contractVersion = Buffer.from(new Uint8Array([14, 95]));
var addressChecksumLen = 4;
var Wallet = /** @class */ (function () {
    function Wallet(publicKey) {
        this._publicKey = publicKey;
        var payload = Buffer.alloc(0);
        payload = Buffer.concat([payload, accountVersion]);
        var pub256Key = crypto.createHash('sha256').update(publicKey).digest();
        var ripmd160 = crypto.createHash('ripemd160').update(pub256Key).digest();
        payload = Buffer.concat([payload, ripmd160]);
        var checksum = Wallet.makeChecksum(payload);
        payload = Buffer.concat([payload, checksum]);
        this.address = payload;
        this.Base58Address = bs58.encode(payload);
    }
    Wallet.makeChecksum = function (payload) {
        var firstSha256 = crypto.createHash('sha256').update(payload).digest();
        var secondSha256 = crypto.createHash('sha256').update(firstSha256).digest();
        var checksum = Buffer.alloc(4);
        secondSha256.copy(checksum, 0, 0, addressChecksumLen);
        return checksum;
    };
    Wallet.IsValidAddress = function (address) {
        return this.isValidAddress(accountVersion, address);
    };
    Wallet.IsValidContractAddress = function (address) {
        return this.isValidAddress(contractVersion, address);
    };
    Wallet.isValidAddress = function (version, address) {
        var addressBytes;
        try {
            addressBytes = bs58.decode(address);
        }
        catch (e) {
            console.error(e);
            return false;
        }
        if (addressBytes.length < version.length + addressChecksumLen) {
            return false;
        }
        var ver = addressBytes.subarray(0, 2);
        if (Buffer.compare(Buffer.from(ver), Buffer.from(version)) !== 0) {
            return false;
        }
        var payload = addressBytes.subarray(0, addressBytes.length - addressChecksumLen);
        var check = Wallet.makeChecksum(payload);
        var checkAddress = Buffer.concat([Buffer.from(payload), Buffer.from(check)]);
        return Buffer.compare(checkAddress, addressBytes) == 0;
    };
    Wallet.fromSeedAsync = function (seed, path) {
        return __awaiter(this, void 0, void 0, function () {
            var crypto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Crypto_1.Crypto.init()];
                    case 1:
                        crypto = _a.sent();
                        return [2 /*return*/, crypto.keysGen.fromSeed(seed, 'm/' + path + '\'')];
                }
            });
        });
    };
    Wallet.fromSeed = function (seed, path) {
        return Crypto_1.Crypto.init().then(function (cr) { return cr.keysGen.fromSeed(seed, 'm/' + path + '\''); });
    };
    return Wallet;
}());
exports.Wallet = Wallet;
