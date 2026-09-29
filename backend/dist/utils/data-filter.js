"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFilter = dataFilter;
function dataFilter(entity, data) {
    return Object.assign(entity, Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)));
}
