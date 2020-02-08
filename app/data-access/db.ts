import { Sequelize } from "sequelize";

import { initUser } from "../models/User";
import { initGroup } from "../models/Group";

export const sequelize = new Sequelize("postgres", "postgres", "Elephant", {
  dialect: "postgres",
});

export function syncWithDB(): void {
  initUser();
  initGroup();
  sequelize.sync().catch((err: Error) => console.log(err.message));
}
