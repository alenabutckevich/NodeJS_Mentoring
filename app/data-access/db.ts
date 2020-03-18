import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { initUser, initGroup } from "../models";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export const sequelize = new Sequelize(process.env.DB_TYPE, process.env.DB_USER, process.env.DB_PASS, {
  dialect: process.env.DB_TYPE,
});

export const User = initUser();
export const Group = initGroup();

export function syncWithDB(): void {
  User.belongsToMany(Group, { through: "UserGroup" });
  Group.belongsToMany(User, { through: "UserGroup" });

  sequelize.sync({ force: true }).then(() => {
    User.create({
      login: "Jimmy_Anderson@google.com",
      password: "84D2BF9E1B6269DCD0E9B4AA1957BFDA81B3B605",
    });
    User.create({
      login: "Annie_Walker@google.com'",
      password: "6FF89588C18691B8DCCB0DF53158B9D32A583822",
    });
    User.create({
      login: "Harper_Chapman@google.com",
      password: "6B8D109221D072C1C03BCB589D2689956DEAE823",
    });
  }).catch((err: Error) => {
    console.log(err.message);
  });
}
