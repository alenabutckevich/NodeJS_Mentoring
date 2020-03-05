import express from "express";
import cors from "cors";

import { initAuthRoutes } from "./initAuthRoutes";
import { initUserRoutes } from "./initUserRoutes";
import { initGroupRoutes } from "./initGroupRoutes";

const router = express.Router();

const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: true,
    preflightContinue: false
};

router.use(cors(options));

initAuthRoutes(router);
initUserRoutes(router);
initGroupRoutes(router);

router.options("*", cors(options));

export default router;
