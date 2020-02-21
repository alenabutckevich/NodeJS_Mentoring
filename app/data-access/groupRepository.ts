import { sequelize } from "./db";

import { GroupAddInput, GroupUpdateInput } from "../types";
import { Group } from "../models/Group";
import { User } from "../models/User";

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

export async function addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
  const t = await sequelize.transaction();

  try {
    const group = await Group.findOne({ where: { id: groupId } });
    userIds.forEach(async userId => {
      const userToAdd = await User.findOne({ where: { id: userId } });
      group.setUsers([userToAdd]);
    })
    await t.commit();
  } catch(error) {
    await t.rollback();
  }
}
