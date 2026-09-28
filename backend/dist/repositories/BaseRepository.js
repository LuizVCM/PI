"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseRepository = createBaseRepository;
const data_source_1 = require("../config/data-source");
function createBaseRepository(entity) {
    const repo = data_source_1.AppDataSource.getRepository(entity);
    return {
        getRepository: () => repo,
        async findAll(options) {
            return repo.find(options);
        },
        async findById(id, options) {
            return repo.findOne({
                where: { id },
                ...options,
            });
        },
        async findOne(options) {
            return repo.findOne(options);
        },
        create(data) {
            return repo.create(data);
        },
        async save(data) {
            return repo.save(data);
        },
        async delete(id) {
            return await repo.delete(id);
        },
        async softDelete(id) {
            return await repo.softDelete(id);
        },
        async exists(id) {
            return repo.exists({
                where: { id },
            });
        },
        async count(options) {
            return repo.count(options);
        },
    };
}
