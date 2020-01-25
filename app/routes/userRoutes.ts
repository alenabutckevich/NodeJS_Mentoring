import express from "express";
import { ValidatedRequest } from "express-joi-validation";

import { validator, createUserSchema, updateUserSchema, UserRequestSchema } from "./validator";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAutoSuggestUsers
} from "../services/userService";

const router = express.Router();

router.post("/user", validator.body(createUserSchema),
  async (req: ValidatedRequest<UserRequestSchema>, res) => {
  const { login, password, age } = req.body;

  try {
    const result = await createUser({ login, password, age: Number(age) });
    res.json(result);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);
    res.json(user);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});

router.put("/user/:id", validator.body(updateUserSchema), 
  async (req: ValidatedRequest<UserRequestSchema>, res) => {
  const { id } = req.params;
  const { login, password, age } = req.body;

  try {
    const result = await updateUser(id, { login, password, age: Number(age) });
    return res.json(result);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUser(id);
    return res.json(result);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});

router.get("/users", async(req, res) => {
  const { limit, loginSubstring } = req.query;
  try {
    const users = await getAutoSuggestUsers(limit, loginSubstring);
    res.json(users);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});

export default router;
