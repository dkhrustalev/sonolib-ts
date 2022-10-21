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
exports.TransactionRequestBase = exports.TransactionRequestDto = void 0;
var TransactionType_1 = require("./TransactionType");
var TransactionRequestDto = /** @class */ (function () {
    function TransactionRequestDto() {
        this.type = TransactionType_1.TransactionType.Account;
    }
    return TransactionRequestDto;
}());
exports.TransactionRequestDto = TransactionRequestDto;
var TransactionRequestBase = /** @class */ (function (_super) {
    __extends(TransactionRequestBase, _super);
    function TransactionRequestBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransactionRequestBase;
}(TransactionRequestDto));
exports.TransactionRequestBase = TransactionRequestBase;
