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
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
    },
  }, {
      sequelize,
      modelName: "user",
      paranoid: true,
      timestamps: true,
    })
}
