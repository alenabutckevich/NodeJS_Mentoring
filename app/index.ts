import express from "express";
import { errors } from "celebrate";
import bunyan from "bunyan";

import routes from "./routes";
import { syncWithDB } from "./data-access/db";

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.use(errors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

syncWithDB();

export const serviceLogger = bunyan.createLogger({ name: "serviceLogger" });
