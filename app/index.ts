import express, { Request, Response } from "express";
import bunyan from "bunyan";

import { errors } from "celebrate";
import { createLogger, transports } from "winston";

import { syncWithDB } from "./data-access/db";
import routes from "./routes";

const port = 3000;

const app = express();

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

syncWithDB();

app.use((err: Error, req: Request, res: Response) => {
  logger.log({ level: "error", message: err.message });
  res.end(500);
});

process.on('unhandledRejection', () => {
  logger.log({ level: "error", message: "unhandled rejection" });
}).on('uncaughtException', err => {
  logger.log({ level: "error", message: err.message });
});

app.listen(port, () => {
  logger.log({ level: "info", message: `Server is running on port ${port}` });
});
