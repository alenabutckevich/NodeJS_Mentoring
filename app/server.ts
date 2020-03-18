import { Response, Request } from "express";

import { app, logger } from "./";
import { syncWithDB } from "./data-access/db";

const port = 3000;

syncWithDB();

app.use((err: Error, req: Request, res: Response) => {
  logger.log({ level: "error", message: err.message });
  res.status(500);
});

process.on('unhandledRejection', () => {
  logger.log({ level: "error", message: "unhandled rejection" });
}).on('uncaughtException', err => {
  logger.log({ level: "error", message: err.message });
});

export const server = app.listen(port, () => {
  logger.log({ level: "info", message: `Server is running on port ${port}` });
});
