"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contracts = void 0;
var createKeccakHash = require("keccak");
__exportStar(require("./Erc20Transfer"), exports);
var Contracts = /** @class */ (function () {
    function Contracts() {
    }
    Contracts.funcHex = function (funcName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var payload = funcName + "(" + args.join(',') + ")";
        var buf = createKeccakHash('keccak256').update(payload).digest('hex');
        return buf.slice(0, 8);
    };
    Contracts.funcHexFromString = function (func) {
        var buf = createKeccakHash('keccak256').update(func).digest('hex');
        return buf.slice(0, 8);
    };
    return Contracts;
}());
exports.Contracts = Contracts;
