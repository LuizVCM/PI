import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
import { Weather } from '../models/Weather';
import { User } from '../models/User';
import { Crop } from '../models/Crop';
import { Sensor } from '../models/Sensor';
import { Plant } from '../models/Plant';
import { Finance } from '../models/Finance';
import { Seed } from '../models/Seed';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

export const AppDataSource = new DataSource({
    type: "mysql", 
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,

    synchronize: true,
    logging: true,
    entities: [Weather, User, Crop, Sensor, Plant, Finance, Seed]
});