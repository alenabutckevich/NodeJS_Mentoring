import { GroupAddInput, GroupUpdateInput } from "../types";
import { Group } from "../models/Group";

export async function addGroup({ name, permissions }: GroupAddInput): Promise<Group> {
  return Group.create({
    name,
    permissions,
  })
}

export async function getGroupById(id: string): Promise<Group> {
  return await Group.findOne({ where: { id } });
}

export async function getAllGroups(): Promise<Group> {
  return await Group.findAll();
}

export async function updateGroupById(id: string, { name, permissions }: GroupUpdateInput): Promise<Group> {
  return await Group.update({ 
    name,
    permissions
  }, {
    where: {
      id,
    }
  });
}

export async function deleteGroupById(id: string): Promise<Group> {
  return await Group.destroy({
    where: {
      id,
    }
  });
}
