import { GroupAddInput, GroupUpdateInput } from "../types";
import { Group } from "../models/Group";
import {
  addGroup,
  deleteGroupById,
  getGroupById,
  getAllGroups,
  updateGroupById,
} from "../data-access/groupRepository";

export async function createGroup({ name, permissions }: GroupAddInput): Promise<Group> {
  try {
    return addGroup({ name, permissions });
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getGroup(id: string): Promise<Group> {
  try {
    return await getGroupById(id);
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function getGroups(): Promise<Group> {
  try {
    return getAllGroups();
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function updateGroup(id: string, { name, permissions }: GroupUpdateInput): Promise<Group> {
  try {
    return await updateGroupById(id, {
      name,
      permissions,
    });
  } catch(err) {
    throw(new Error(err.message));
  }
}

export async function deleteGroup(id: string): Promise<Group> {
  try {
    return await deleteGroupById(id);
  } catch(err) {
    throw(new Error(err.message));
  }
}
