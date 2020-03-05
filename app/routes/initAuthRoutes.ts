import * as jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

import { logger } from "..";

import { JWT_SECRET } from "../constants";

import { encryptPassword } from "../utils/encryptPassword";
import { getUserByLogin } from "../services/userService";

export function initAuthRoutes(router: Router): void {
    router.post("/login", async (req: Request, res: Response) => {
        const { login, password } = req.body;

        try {
            const user = await getUserByLogin(login);

            if (user && encryptPassword(password) === user.password) {
                const token = jwt.sign({username: login},
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );
    
                res.json({ token: token }).end();
            } else {
                res.sendStatus(403).end("user does not exist");
            }
        } catch (err) {
            logger.log({ level: "error", message: `method: post, url: "/login", args: {login: ${login}, password: ${password} }, error: ${err.message}`});
            return res.sendStatus(400).end(err.message);
        }
    });
}
