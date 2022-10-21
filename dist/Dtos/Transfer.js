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
exports.Transfer = exports.TransferDto = void 0;
var utils_1 = require("../Crypto/utils");
var bs58 = require("bs58");
var TransferDto = /** @class */ (function () {
    function TransferDto(address, value) {
        this.address = address;
        this.value = value;
    }
    return TransferDto;
}());
exports.TransferDto = TransferDto;
var Transfer = /** @class */ (function (_super) {
    __extends(Transfer, _super);
    function Transfer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transfer.prototype.toBytes = function () {
        var addr = bs58.decode(this.address);
        var value = utils_1.BigIntToBufferLE(this.value, 8);
        return Buffer.concat([addr, value]);
    };
    return Transfer;
}(TransferDto));
exports.Transfer = Transfer;
