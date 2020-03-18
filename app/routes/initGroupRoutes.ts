import { Router } from "express";
import { ValidatedRequest } from "express-joi-validation";

import { logger } from "..";

import { checkToken } from "../middleware/checkToken";

import {
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  getGroups,
  addUsers,
} from "../services/groupService";

import {
  groupValidator,
  createGroupSchema,
  updateGroupSchema,
  GroupRequestSchema,
} from "../validators/groupValidator";

export function initGroupRoutes(router: Router): void {
  router.post("/group", groupValidator.body(createGroupSchema), checkToken,
  async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    const { name, permissions } = req.body;

    try {
      const result = await createGroup({ name, permissions });

      res.json(result);
    } catch(err) {
      logger.log({ level: "error", message: `method: post, url: "/group", args: { name: ${name}, permissions: ${permissions} }, error: ${err.message}` });
      return res.sendStatus(400).end(err.message);
    }
  });

  router.get("/group/:id", checkToken, async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getGroup(id);
      res.json(result);
    } catch(err) {
      logger.log({ level: "error", message: `method: get, url: "/group/:id", args: { id: ${id} }, error: ${err.message}` });
      return res.sendStatus(400).end(err.message);
    }
  });

  router.put("/group/:id", groupValidator.body(updateGroupSchema), checkToken,
    async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;

    try {
      const result = await updateGroup(id, { name, permissions });
      return res.json(result);
    } catch(err) {
      logger.log({ level: "error", message: `method: put, url: "/group/:id", args: { id: ${id}, name: ${name}, permissions: ${permissions} }, error: ${err.message}` });
      return res.sendStatus(400).end(err.message);
    }
  });

  router.delete("/group/:id", checkToken, async (req, res) => {
    const { id } = req.params;

    try {
      const result = await deleteGroup(id);
      return res.json(result);
    } catch(err) {
      logger.log({ level: "error", message: `method: delete, url: "/group/:id", args: { id: ${id} }, error: ${err.message}` });
      return res.sendStatus(400).end(err.message);
    }
  });

  router.get("/groups", checkToken, async(_, res) => {
    try {
      const result = await getGroups();
      res.json(result);
    } catch(err) {
      logger.log({ level: "error", message: `method: get, url: "/groups", error: ${err.message}` });
      return res.sendStatus(400).end(err.message);
    }
  });

  router.post("/group/addUsers", checkToken, (req, res) => {
    const { groupId, userIds } = req.body;

    try {
      addUsers(groupId, userIds);
      res.end();
    } catch(err) {
      logger.log({ level: "error", message: `method: post, url: "/groups/addUsers", args: { groupId: ${groupId}, userIds: ${userIds} }, error: ${err.message}` });
      return res.sendStatus(400).end(err.message);
    }
  });
}
