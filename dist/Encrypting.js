"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypting = void 0;
var crypto = require("crypto");
var bytesInSalt = 128;
var iterations = 10000;
var algorithm = 'aes-256-cbc';
var Encrypting = /** @class */ (function () {
    function Encrypting(password) {
        var _this = this;
        this.encrypt = function (data, salt) {
            var saltLocal = salt;
            if (saltLocal == null) {
                saltLocal = crypto.randomBytes(bytesInSalt);
            }
            var cipher = _this.createCipher(saltLocal);
            var encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            var saltString = saltLocal.toString('hex');
            return saltString + encrypted;
        };
        this.createCipher = function (salt) {
            return _this.createCryptoFunc(salt, crypto.createCipheriv);
        };
        this.createDecipher = function (salt) {
            return _this.createCryptoFunc(salt, crypto.createDecipheriv);
        };
        this.createCryptoFunc = function (salt, func) {
            var _a = _this.hash(salt), key = _a.key, iv = _a.iv;
            var cf = func(algorithm, key, iv);
            // @ts-ignore
            cf.setAutoPadding(true);
            return cf;
        };
        this.password = password;
    }
    Encrypting.prototype.decrypt = function (data) {
        var salt = data.substring(0, bytesInSalt * 2);
        var encryptedData = data.substring(bytesInSalt * 2);
        var decipher = this.createDecipher(Buffer.from(salt, 'hex'));
        var receivedPlaintext = decipher.update(encryptedData, 'hex', 'utf8');
        receivedPlaintext += decipher.final().toString();
        return receivedPlaintext;
    };
    ;
    Encrypting.prototype.hash = function (salt) {
        var iv = crypto.pbkdf2Sync(this.password, salt, iterations, 16, 'sha512');
        var key = crypto.pbkdf2Sync(this.password, salt, iterations, 32, 'sha512');
        return { key: key, iv: iv };
    };
    Encrypting.hash2Salt = function (data) {
        var salt = crypto.randomBytes(bytesInSalt);
        return crypto.pbkdf2Sync(data, salt, iterations, 32, 'sha512').toString('hex');
    };
    Encrypting.doubleSha256 = function (val) {
        var first = crypto.createHash('sha256').update(val).digest();
        var second = crypto.createHash('sha256').update(first).digest();
        return second.toString('hex');
    };
    return Encrypting;
}());
exports.Encrypting = Encrypting;
