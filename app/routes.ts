import express from "express";
import { ValidatedRequest } from "express-joi-validation";

import { validator, userSchema, UserRequestSchema } from "./validator";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAutoSuggestUsers
} from "./userService";

const router = express.Router();

router.post("/user", validator.body(userSchema),
  (req: ValidatedRequest<UserRequestSchema>, res) => {
  const { login, password, age } = req.body;

  try {
    const user = createUser({ login, password, age: Number(age) });
    res.json(user);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  
  try {
    const user = getUser(id);
    res.json(user);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});
  
router.put("/user/:id", validator.body(userSchema), 
  (req: ValidatedRequest<UserRequestSchema>, res) => {
  const { id } = req.params;
  const { login, password, age } = req.body;
  
  try {
    const updatedUser = updateUser(id, { login, password, age: Number(age) });
    res.json(updatedUser);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});
  
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedUser = deleteUser(id);
    res.json(deletedUser);
  } catch(err) {
    return res.status(400).end(err.message);
  }
});

router.get("/users", (req, res) => {
  const { limit, loginSubstring } = req.body;
  const filteredUsers = getAutoSuggestUsers(Number(limit), loginSubstring);
  
  res.json(filteredUsers);
});

export default router;
