import * as Joi from "@hapi/joi";

import {
  createValidator,
  ContainerTypes,
  ValidatedRequestSchema
} from "express-joi-validation";
import { Permission } from "../types";

export const groupValidator = createValidator();

export const createGroupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()).required(),
});

export const updateGroupSchema = Joi.object({
  name: Joi.string(),
  permissions: Joi.array().items(Joi.string()),
});

export interface GroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    name: string;
    permissions: Permission[];
  };
}
