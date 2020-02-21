import { Router } from "express";
import { ValidatedRequest } from "express-joi-validation";

import { logger } from "..";

import { userValidator, createUserSchema, updateUserSchema, UserRequestSchema } from "../validators/userValidator";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAutoSuggestUsers
} from "../services/userService";

export function initUserRoutes(router: Router): void {
  router.post("/user", userValidator.body(createUserSchema),
  async (req: ValidatedRequest<UserRequestSchema>, res) => {
    const { login, password, age } = req.body;

    try {
      const result = await createUser({ login, password, age: Number(age) });
      res.json(result);
    } catch(err) {
      logger.log({ level: "error", message: `method: post, url: "/user", args: { login: ${login}, password: ${password}, age: ${age} }, error: ${err.message}` });
      return res.status(400).end(err.message);
    }
  });

  router.get("/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const user = await getUser(id);
      res.json(user);
    } catch(err) {
      logger.log({ level: "error", message: `method: get, url: "/user/:id", args: { id: ${id} }, error: ${err.message}`});
      return res.status(400).end(err.message);
    }
  });

  router.put("/user/:id", userValidator.body(updateUserSchema), 
    async (req: ValidatedRequest<UserRequestSchema>, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;

    try {
      const result = await updateUser(id, { login, password, age: Number(age) });
      return res.json(result);
    } catch(err) {
      logger.log({ level: "error", message: `method: put, url: "/user/:id", args: { id: ${id}, login: ${login}, password: ${password}, age: ${age} }, error: ${err.message}`});
      return res.status(400).end(err.message);
    }
  });

  router.delete("/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await deleteUser(id);
      return res.json(result);
    } catch(err) {
      logger.log({ level: "error", message: `method: delete, url: "/user/:id", args: { id: ${id} }, error: ${err.message}`});
      return res.status(400).end(err.message);
    }
  });

  router.get("/users", async(req, res) => {
    const { limit, loginSubstring } = req.query;
    try {
      const users = await getAutoSuggestUsers(limit, loginSubstring);
      res.json(users);
    } catch(err) {
      logger.log({ level: "error", message: `method: get, url: "/users", args: { limit: ${limit}, loginSubstring: ${loginSubstring} }, error: ${err.message}`});
      return res.status(400).end(err.message);
    }
  });
}
