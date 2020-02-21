import { createHash } from "crypto";

import { serviceLogger } from "..";

import { UserAddInput, UserUpdateInput } from "../types";
import { User } from "../models/User";
import {
  addUser,
  deleteUserById,
  getUserById,
  getUserByLogin,
  getUsers,
  updateUserById,
} from "../data-access/userRepository";

function encryptPassword(password: string): string {
  return String(createHash("sha1").update(password, "utf8").digest());
}

export async function createUser({ login, password, age }: UserAddInput): Promise<User> {
  serviceLogger.info(`createUser method has been invoked with params: login: ${login}, password: ${password}, age: ${age}`);

  try {
    const user = await getUserByLogin(login);
    if (user) { throw new Error("User with this login already exists.") }

    return addUser({ login, password: encryptPassword(password), age });
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getUser(id: string): Promise<User> {
  serviceLogger.info(`getUser method has been invoked with params: id: ${id}`);

  try {
    return await getUserById(id);
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getAutoSuggestUsers(limit: number, loginSubstring = ""): Promise<User> {
  serviceLogger.info(`getAutoSuggestUsers method has been invoked with params: limit: ${limit}, loginSubstring: ${loginSubstring}`);

  try {
    return getUsers(loginSubstring, isNaN(limit) ? undefined : limit);
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function updateUser(id: string, { login, password, age }: UserUpdateInput): Promise<User> {
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

export async function deleteUser(id: string): Promise<User> {
  serviceLogger.info(`deleteUser method has been invoked with params: id: ${id}`);

  try {
    return await deleteUserById(id);
  } catch(err) {
    throw(new Error(err.message));
  }
}
