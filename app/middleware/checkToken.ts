import * as jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

import { JWT_SECRET } from "../constants";

export const checkToken = (req: Request, res: Response, next: NextFunction): Response | undefined  => {
    const authHeader = req.headers['x-access-token'] || req.headers['authorization'];

    if (authHeader) {
        const startWith = "Bearer ";

        if (typeof authHeader === "string" && authHeader.startsWith(startWith)) {
          const token = authHeader.slice(startWith.length, authHeader.length);

          jwt.verify(token, JWT_SECRET, (err) => {
            if (err) {
              return res.sendStatus(403);
            } else {
              next();
            }
          });
        }
    } else {
        return res.sendStatus(401);
    }
};
