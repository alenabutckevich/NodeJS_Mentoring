import { Sequelize } from "sequelize";

import { initUser } from "../models/User";

export const sequelize = new Sequelize("postgres", "postgres", "Elephant", {
  dialect: "postgres",
  define: {
    timestamps: false,
  }
});

export function syncWithDB(): void {
  initUser();
  sequelize.sync().catch((err: Error) => console.log(err.message));
}
