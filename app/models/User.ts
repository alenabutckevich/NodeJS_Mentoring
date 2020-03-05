import { BuildOptions, DataTypes, Model } from "sequelize";

import { sequelize } from "../data-access/db";

export interface UserModel extends Model {
  id?: number;
  login: string;
  password: string;
  age?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
}

export function initUser(): UserStatic {
  return sequelize.define("User", {
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }) as UserStatic;
}
