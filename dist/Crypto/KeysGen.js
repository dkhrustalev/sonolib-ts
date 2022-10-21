"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysGen = void 0;
var HDKeys_1 = require("./HDKeys");
var KeysGen = /** @class */ (function () {
    function KeysGen(sodium) {
        var _this = this;
        this.generateRandom = function () {
            var keyPair = _this.sodium.crypto_sign_keypair();
            return new HDKeys_1.HDKeys(keyPair);
        };
        this.fromPrivateKey = function (privateKey) {
            var pkBuf = Buffer.from(privateKey, 'hex');
            var seed = _this.sodium.crypto_sign_ed25519_sk_to_seed(pkBuf);
            var keyPair = _this.sodium.crypto_sign_seed_keypair(seed);
            return new HDKeys_1.HDKeys(keyPair);
        };
        this.fromSeed = function (seed, path) {
            if (path === void 0) { path = 'm/0\''; }
            var key = HDKeys_1.derivePath(path, seed).key;
            return new HDKeys_1.HDKeys(_this.sodium.crypto_sign_seed_keypair(key));
        };
        this.sodium = sodium;
    }
    return KeysGen;
}());
exports.KeysGen = KeysGen;
