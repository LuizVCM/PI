import { createCropSchema, updateCropSchema } from "../schemas/crop.schema";
import { createTerritorySchema, updateTerritorySchema } from "../schemas/territory.schema";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";
import { validate } from "./validate";
export const validateUserCreate = validate(createUserSchema);
export const validateUserUpdate = validate(updateUserSchema);
export const validateUserLogin = validate(loginUserSchema);
export const validateTerritoryCreate = validate(createTerritorySchema);
export const validateTerritoryUpdate = validate(updateTerritorySchema);
export const validateCropCreate = validate(createCropSchema);
export const validateCropUpdate = validate(updateCropSchema);