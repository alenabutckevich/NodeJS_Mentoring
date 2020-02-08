import express from "express";

import { initUserRoutes } from "./initUserRoutes";
import { initGroupRoutes } from "./initGroupRoutes";

const router = express.Router();

initUserRoutes(router);
initGroupRoutes(router);

export default router;
