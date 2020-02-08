import { Sequelize } from "sequelize";

import { initUser, User } from "../models/User";
import { initGroup, Group } from "../models/Group";

export const sequelize = new Sequelize("postgres", "postgres", "Elephant", {
  dialect: "postgres",
});

export function syncWithDB(): void {
  initUser();
  initGroup();

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
  });
}
