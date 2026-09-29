"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPlants = insertPlants;
const kc_calculator_1 = require("../../calc/kc-calculator");
const Plant_1 = require("../../models/Plant");
const data_source_1 = require("../data-source");
const plant_data_1 = require("../data/plant.data");
async function insertPlants() {
    const repo = data_source_1.AppDataSource.getRepository(Plant_1.Plant);
    const plantsToSave = plant_data_1.plantsData.map((plant) => {
        const kcMedio = (0, kc_calculator_1.computeKcMedio)({
            kcIni: plant.kcIni,
            kcIniMax: plant.kcIniMax,
            kcMid: plant.kcMid,
            kcMidMax: plant.kcMidMax,
            kcEnd: plant.kcEnd,
            kcEndMax: plant.kcEndMax,
            iniDays: plant.iniDays,
            devDays: plant.devDays,
            midDays: plant.midDays,
            lateDays: plant.lateDays,
        });
        // remove os campos que não são salvos
        const { kcIni, kcIniMax, kcMid, kcMidMax, kcEnd, kcEndMax, iniDays, devDays, midDays, lateDays, ...rest } = plant;
        return { ...rest, kcMedio };
    });
    for (const data of plantsToSave) {
        const exists = await repo.findOne({
            where: {
                nomeCientifico: data.nomeCientifico,
            },
        });
        if (exists) {
            repo.merge(exists, data);
            await repo.save(exists);
            continue;
        }
        const plant = repo.create(data);
        await repo.save(plant);
    }
}
