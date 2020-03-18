import express from "express";
import bunyan from "bunyan";

import { errors } from "celebrate";
import { createLogger, transports } from "winston";

import routes from "./routes";

export const app = express();

export const logger = createLogger({
  transports: [
    new transports.Console(),
  ],
  exceptionHandlers: [
    new transports.Console(),
  ],
  exitOnError: false,
});

export const serviceLogger = bunyan.createLogger({ name: "serviceLogger" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.use(errors());
