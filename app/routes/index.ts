import express from "express";

import { initAuthRoutes } from "./initAuthRoutes";
import { initUserRoutes } from "./initUserRoutes";
import { initGroupRoutes } from "./initGroupRoutes";

const router = express.Router();

initAuthRoutes(router);
initUserRoutes(router);
initGroupRoutes(router);

export default router;
