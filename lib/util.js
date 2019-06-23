"use strict";
// https://github.com/HenrikJoreteg/extend-object/blob/v0.1.0/extend-object.js
Object.defineProperty(exports, "__esModule", { value: true });
var arr = [];
var each = arr.forEach;
var slice = arr.slice;
function extend(obj, ...rest) {
    each.call(rest, function (source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
}
exports.extend = extend;
;
//# sourceMappingURL=util.js.map