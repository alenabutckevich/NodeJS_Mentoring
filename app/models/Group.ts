import { DataTypes, Model } from "sequelize";

import { sequelize } from "../data-access/db";

export class Group extends Model {}

export function initGroup(): void {
  Group.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
  }, {
      sequelize,
      modelName: "Group",
      timestamps: true,
    });
}
