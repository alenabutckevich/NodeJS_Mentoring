import * as Joi from "@hapi/joi";

import {
  createValidator,
  ContainerTypes,
  ValidatedRequestSchema
} from "express-joi-validation";

export const validator = createValidator();

export const userSchema = Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)/).required(),
  age: Joi.number().min(4).max(130).required(),
});

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    login: string;
    password: string;
    age: boolean;
  };
}
