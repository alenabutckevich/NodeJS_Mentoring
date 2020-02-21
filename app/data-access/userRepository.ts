import { Op } from "sequelize";

import { UserAddInput, UserUpdateInput } from "../types";
import { User } from "../models/User";

export async function addUser({ login, password, age }: UserAddInput): Promise<User> {
  return User.create({
    login,
    password,
    age: isNaN(age) ? null : age,
  })
}

export async function getUserByLogin(login: string): Promise<User> {
  return await User.findOne({ where: { login } });
}

export async function getUserById(id: string): Promise<User> {
  return await User.findOne({ where: { id } });
}

export async function getUsers(loginSubstring = "", limit?: number): Promise<User> {
  const users = User.findAll({
    limit,
    where:{
      login: {
        [Op.startsWith]: loginSubstring,
      }
    },
    order: [['login', 'ASC']],
  });

  return users;
}

export async function updateUserById(id: string, { login, password, age }: UserUpdateInput): Promise<User> {
  return await User.update({ 
    login,
    password,
    age: isNaN(age) ? null : age,
  }, {
    where: {
      id,
    }
  });
}

export async function deleteUserById(id: string): Promise<User> {
  return await User.destroy({
    where: {
      id,
    }
  });
}
