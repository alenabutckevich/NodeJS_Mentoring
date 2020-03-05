import { serviceLogger } from "..";

import {
  addUser,
  deleteUserById,
  findUserById,
  findUserByLogin,
  getUsers,
  updateUserById,
} from "../data-access/userRepository";
import { UserModel } from "../models";

import { UserAddInput, UserUpdateInput } from "../types";
import { encryptPassword } from "../utils/encryptPassword";

export async function createUser({ login, password, age }: UserAddInput): Promise<UserModel> {
  serviceLogger.info(`createUser method has been invoked with params: login: ${login}, password: ${password}, age: ${age}`);

  try {
    const user = await findUserByLogin(login);
    if (user) { throw new Error("User with this login already exists.") }

    return addUser({ login, password: encryptPassword(password), age });
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getUser(id: string): Promise<UserModel | null> {
  serviceLogger.info(`getUser method has been invoked with params: id: ${id}`);

  try {
    return await findUserById(id);
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getUserByLogin(login: string): Promise<UserModel | null> {
  serviceLogger.info(`getUserByLogin method has been invoked with params: login: ${login}`);

  try {
    return await findUserByLogin(login);
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getAutoSuggestUsers(limit: number, loginSubstring = ""): Promise<UserModel[]> {
  serviceLogger.info(`getAutoSuggestUsers method has been invoked with params: limit: ${limit}, loginSubstring: ${loginSubstring}`);

  try {
    return getUsers(loginSubstring, isNaN(limit) ? undefined : limit);
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function updateUser(id: string, { login, password, age }: UserUpdateInput): Promise<[number, UserModel[]]> {
  serviceLogger.info(`updateUser method has been invoked with params: id: ${id}, login: ${login}, password: ${password}, age: ${age}`);

  try {
    return await updateUserById(id, {
      login,
      password: password ? encryptPassword(password) : undefined,
      age
    });
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function deleteUser(id: string): Promise<number> {
  serviceLogger.info(`deleteUser method has been invoked with params: id: ${id}`);

  try {
    return await deleteUserById(id);
  } catch(err) {
    throw(new Error(err.message));
  }
}
