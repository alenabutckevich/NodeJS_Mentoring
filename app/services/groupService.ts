import { serviceLogger } from "..";

import {
  addGroup,
  deleteGroupById,
  getGroupById,
  getAllGroups,
  updateGroupById,
  addUsersToGroup,
} from "../data-access/groupRepository";

import { GroupModel } from "../models";
import { GroupAddInput, GroupUpdateInput } from "../types";

export async function createGroup({ name, permissions }: GroupAddInput): Promise<GroupModel> {
  serviceLogger.info(`createGroup method has been invoked with params: name: ${name}, permissions: ${permissions}`);

  try {
    return addGroup({ name, permissions });
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getGroup(id: string): Promise<GroupModel | null> {
  serviceLogger.info(`getGroup method has been invoked with params: id: ${id}`);

  try {
    return await getGroupById(id);
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getGroups(): Promise<GroupModel[]> {
  serviceLogger.info(`getGroups method has been invoked`);

  try {
    return getAllGroups();
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function updateGroup(id: string, { name, permissions }: GroupUpdateInput): Promise<[number, GroupModel[]]> {
  serviceLogger.info(`updateGroup method has been invoked with params: id: ${id}, name: ${name}, permissions: ${permissions}`);

  try {
    return await updateGroupById(id, {
      name,
      permissions,
    });
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function deleteGroup(id: string): Promise<number> {
  serviceLogger.info(`deleteGroup method has been invoked with params: id: ${id}`);

  try {
    return await deleteGroupById(id);
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function addUsers(groupId: string, userIds: string[]): Promise<void> {
  serviceLogger.info(`addUsers method has been invoked with params: groupId: ${groupId}, userIds: ${userIds}`);

  try {
    return await addUsersToGroup(groupId, userIds);
  } catch(err) {
    throw(new Error(err.message));
  }
}
