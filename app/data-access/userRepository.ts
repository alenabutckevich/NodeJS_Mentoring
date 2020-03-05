import { Op } from "sequelize";

import { UserModel } from "../models";
import { UserAddInput, UserUpdateInput } from "../types";

import { User } from "./db";

export async function addUser({ login, password, age }: UserAddInput): Promise<UserModel> {
  return User.create({
    login,
    password,
    age: isNaN(age) ? null : age,
  })
}

export async function findUserByLogin(login: string): Promise<UserModel | null> {
  return await User.findOne({ where: { login } });
}

export async function findUserById(id: string): Promise<UserModel | null> {
  return await User.findOne({ where: { id } });
}

export async function getUsers(loginSubstring = "", limit?: number): Promise<UserModel[]> {
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

export async function updateUserById(id: string, { login, password, age }: UserUpdateInput): Promise<[number, UserModel[]]> {
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

export async function deleteUserById(id: string): Promise<number> {id
  return await User.destroy({
    where: {
      id,
    }
  });
}
