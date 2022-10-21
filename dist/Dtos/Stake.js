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
exports.Stake = exports.StakeDto = void 0;
var Transfer_1 = require("./Transfer");
var utils_1 = require("../Crypto/utils");
var bs58 = require("bs58");
var StakeDto = /** @class */ (function (_super) {
    __extends(StakeDto, _super);
    function StakeDto(address, value, nodeId) {
        var _this = _super.call(this, address, value) || this;
        _this.nodeId = nodeId;
        return _this;
    }
    return StakeDto;
}(Transfer_1.TransferDto));
exports.StakeDto = StakeDto;
var Stake = /** @class */ (function (_super) {
    __extends(Stake, _super);
    function Stake() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stake.prototype.toBytes = function () {
        var addr = bs58.decode(this.address);
        var value = utils_1.BigIntToBufferLE(this.value, 8);
        var node_id = Buffer.alloc(0);
        if (this.nodeId) {
            node_id = Buffer.from(this.nodeId, 'hex');
        }
        return Buffer.concat([addr, value, node_id]);
    };
    return Stake;
}(StakeDto));
exports.Stake = Stake;
