import { Router } from "express";
import { ValidatedRequest } from "express-joi-validation";

import { groupValidator, createGroupSchema, updateGroupSchema, GroupRequestSchema } from "../validators/groupValidator";

import {
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  getGroups,
} from "../services/groupService";

export function initGroupRoutes(router: Router) {
  router.post("/group", groupValidator.body(createGroupSchema),
  async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    const { name, permissions } = req.body;

    try {
      const result = await createGroup({ name, permissions });
      console.log(result);
      res.json(result);
    } catch(err) {
      console.log(err);
      return res.status(400).end(err.message);
    }
  });

  router.get("/group/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getGroup(id);
      res.json(result);
    } catch(err) {
      return res.status(400).end(err.message);
    }
  });

  router.put("/group/:id", groupValidator.body(updateGroupSchema), 
    async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;

    try {
      const result = await updateGroup(id, { name, permissions });
      return res.json(result);
    } catch(err) {
      return res.status(400).end(err.message);
    }
  });

  router.delete("/group/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await deleteGroup(id);
      return res.json(result);
    } catch(err) {
      return res.status(400).end(err.message);
    }
  });

  router.get("/groups", async(req, res) => {
    try {
      const result = await getGroups();
      res.json(result);
    } catch(err) {
      return res.status(400).end(err.message);
    }
  });
}
