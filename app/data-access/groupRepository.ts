import { Group, User, sequelize } from "./db";

import { GroupModel } from "../models";
import { GroupAddInput, GroupUpdateInput } from "../types";

export async function addGroup({ name, permissions }: GroupAddInput): Promise<GroupModel> {
  return Group.create({
    name,
    permissions,
  })
}

export async function getGroupById(id: string): Promise<GroupModel | null> {
  return await Group.findOne({ where: { id } });
}

export async function getAllGroups(): Promise<GroupModel[]> {
  return await Group.findAll();
}

export async function updateGroupById(id: string, { name, permissions }: GroupUpdateInput): Promise<[number, GroupModel[]]> {
  return await Group.update({ 
    name,
    permissions
  }, {
    where: {
      id,
    }
  });
}

export async function deleteGroupById(id: string): Promise<number> {
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
      if (group) {
        group.setUsers([userToAdd]);
      }
    })
    await t.commit();
  } catch(error) {
    await t.rollback();
  }
}
