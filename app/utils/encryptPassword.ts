import { createHash } from "crypto";

export function encryptPassword(password: string): string {
    return String(createHash("sha1").update(password, "utf8").digest());
}
