import { DataTypes, Model } from "sequelize";

import { sequelize } from "../data-access/db";

export class User extends Model {}

export function initUser(): void {
  User.init({
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
  }, {
      sequelize,
      modelName: "User",
      paranoid: true,
      timestamps: true,
    });
}
