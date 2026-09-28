"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaUnit = void 0;
exports.toSquareMeters = toSquareMeters;
exports.fromSquareMeters = fromSquareMeters;
var AreaUnit;
(function (AreaUnit) {
    AreaUnit["M2"] = "m2";
    AreaUnit["HA"] = "ha";
    AreaUnit["KM2"] = "km2";
})(AreaUnit || (exports.AreaUnit = AreaUnit = {}));
function toSquareMeters(value, unit) {
    switch (unit) {
        case AreaUnit.M2:
            return value;
        case AreaUnit.HA:
            return value * 10_000;
        case AreaUnit.KM2:
            return value * 1_000_000;
    }
}
function fromSquareMeters(value, unit) {
    switch (unit) {
        case AreaUnit.M2:
            return value;
        case AreaUnit.HA:
            return value / 10_000;
        case AreaUnit.KM2:
            return value / 1_000_000;
    }
}
