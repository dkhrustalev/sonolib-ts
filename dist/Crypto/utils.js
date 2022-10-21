"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBigUInt64BE = exports.getFirstAndLast = exports.BigIntToBufferBE = exports.BigIntToBufferLE = exports.doubleSha256 = exports.MakeChecksum = exports.NewAddress = exports.toSatoshi = exports.COMMISSION = exports.toBigInt = exports.fromSatoshi = exports.TxVersion = void 0;
var bs58 = require("bs58");
var M = 100000000;
var MCountSymbols = 9;
var bigInt = require("big-integer");
var crypto = require("crypto");
var addressChecksumLen = 4;
var ContractVersion = Buffer.from(new Uint8Array([16, 3]));
exports.TxVersion = 1;
exports.fromSatoshi = function (value) {
    return value / M;
};
exports.toBigInt = function (value) {
    return bigInt(value);
};
exports.COMMISSION = exports.toBigInt(1000000);
exports.toSatoshi = function (value) {
    var str = value.toString();
    var dotIndex = str.indexOf('.');
    if (dotIndex == -1) {
        return bigInt(value).multiply(bigInt(M));
    }
    var strConverted = str.replace('.', '');
    if (str.indexOf('0.') === 0) {
        strConverted = str.replace('0.', '');
    }
    if (MCountSymbols - str.length + dotIndex < 0)
        throw new Error('value smaller then satoshi');
    var strConverted2 = addZeroToEnd(strConverted, MCountSymbols - str.length + dotIndex);
    return bigInt(strConverted2);
};
var addZeroToEnd = function (str, count) {
    var newStr = str;
    for (var i = 0; i < count; i++) {
        newStr += '0';
    }
    return newStr;
};
exports.NewAddress = function (publicKey, prefix) {
    var payload = Buffer.alloc(0);
    payload = Buffer.concat([payload, prefix]);
    var pub256Key = crypto.createHash('sha256').update(publicKey).digest();
    var ripmd160 = crypto.createHash('ripemd160').update(pub256Key).digest();
    payload = Buffer.concat([payload, ripmd160]);
    var checksum = exports.MakeChecksum(payload);
    payload = Buffer.concat([payload, checksum]);
    return bs58.encode(payload);
};
exports.MakeChecksum = function (payload) {
    var firstSha256 = crypto.createHash('sha256').update(payload).digest();
    var secondSha256 = crypto.createHash('sha256').update(firstSha256).digest();
    var checksum = Buffer.alloc(4);
    secondSha256.copy(checksum, 0, 0, addressChecksumLen);
    return checksum;
};
exports.doubleSha256 = function (val) {
    var first = crypto.createHash('sha256').update(val).digest();
    var second = crypto.createHash('sha256').update(first).digest();
    return second.toString('hex');
};
exports.BigIntToBufferLE = function (val, size) {
    var arr = val.toArray(256).value;
    var buf = Buffer.alloc(size);
    buf.set(arr.reverse());
    return buf;
};
exports.BigIntToBufferBE = function (val, size) {
    var arr = val.toArray(256).value;
    var buf = Buffer.alloc(size);
    buf.set(arr.reverse());
    return buf.reverse();
};
function errInvalidArgTypeMsg(name, expected, actual) {
    return "The \"" + name + "\" argument must be of type " + expected + ". Recieved type " + actual;
}
function errOutOfRangeMsg(expected, received) {
    return "The value of \"offset\" is out of range. It must be " + expected + ". Received " + received;
}
function boundsErrorMsg(value, length) {
    if (Math.floor(value) !== value) {
        return errOutOfRangeMsg("an integer", value);
    }
    if (length < 0)
        return "Attempt to access memory outside buffer bounds";
    return errOutOfRangeMsg(">= 0 and <=" + length, value);
}
function getFirstAndLast(buffer, offset) {
    if (!Buffer.isBuffer(buffer)) {
        throw new Error(errInvalidArgTypeMsg("buffer", "Buffer", typeof buffer));
    }
    if (typeof offset !== "number") {
        throw new Error(errInvalidArgTypeMsg("offset", "number", typeof offset));
    }
    var first = buffer[offset];
    var last = buffer[offset + 7];
    if (first === undefined || last === undefined) {
        throw new Error(boundsErrorMsg(offset, buffer.length - 8));
    }
    return { first: first, last: last };
}
exports.getFirstAndLast = getFirstAndLast;
function readBigUInt64BE(buffer, offset) {
    if (offset === void 0) { offset = 0; }
    var _a = getFirstAndLast(buffer, offset), first = _a.first, last = _a.last;
    var hi = first * Math.pow(2, 24) +
        buffer[++offset] * Math.pow(2, 16) +
        buffer[++offset] * Math.pow(2, 8) +
        buffer[++offset];
    var lo = buffer[++offset] * Math.pow(2, 24) +
        buffer[++offset] * Math.pow(2, 16) +
        buffer[++offset] * Math.pow(2, 8) +
        last;
    return bigInt(hi).shiftLeft(bigInt(32)).plus(bigInt(lo));
}
exports.readBigUInt64BE = readBigUInt64BE;
