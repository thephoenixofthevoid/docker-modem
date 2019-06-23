"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util'), stream = require('readable-stream');
util.inherits(Http_Duplex, stream.Duplex);
function Http_Duplex(req, res, options) {
    var self = this;
    stream.Duplex.call(self, options);
    self._output = null;
    self.connect(req, res);
}
exports.Http_Duplex = Http_Duplex;
Http_Duplex.prototype.connect = function (req, res) {
    var self = this;
    self.req = req;
    self._output = res;
    self.emit('response', res);
    res.on('data', function (c) {
        if (!self.push(c))
            self._output.pause();
    });
    res.on('end', function () {
        self.push(null);
    });
};
Http_Duplex.prototype._read = function (n) {
    if (this._output)
        this._output.resume();
};
Http_Duplex.prototype._write = function (chunk, encoding, cb) {
    this.req.write(chunk, encoding);
    cb();
};
Http_Duplex.prototype.end = function (chunk, encoding, cb) {
    this._output.socket.destroy();
    return this.req.end(chunk, encoding, cb);
};
Http_Duplex.prototype.destroy = function () {
    this.req.destroy();
    this._output.socket.destroy();
};
//# sourceMappingURL=http_duplex.js.map