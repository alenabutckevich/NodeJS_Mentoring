import { BuildOptions, DataTypes, Model } from "sequelize";

import { sequelize } from "../data-access/db";
import { Permission } from "../types";

import { UserModel } from "./User";

export interface GroupModel extends Model {
  id?: number;
  name: string;
  permissions: Permission[];
  age?: number;
  createdAt?: Date;
  updatedAt?: Date;
  setUsers(users: (UserModel | null)[]): void;
}

export type GroupStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GroupModel;
}

export function initGroup(): GroupStatic {
  return sequelize.define("Group", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
  }) as GroupStatic;
}
