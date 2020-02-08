import * as Joi from "@hapi/joi";

import {
  createValidator,
  ContainerTypes,
  ValidatedRequestSchema
} from "express-joi-validation";

export const userValidator = createValidator();

export const createUserSchema = Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)/).required(),
  age: Joi.number().min(4).max(130),
});

export const updateUserSchema = Joi.object({
  login: Joi.string().email(),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)/),
  age: Joi.number().min(4).max(130),
});

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    login: string;
    password: string;
    age: boolean;
  };
}
