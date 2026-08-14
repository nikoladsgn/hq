import crypto from "crypto";

export const SESSION_COOKIE = "nikola_admin";

export function expectedSessionValue(): string {
  const password = process.env.ADMIN_PASSWORD || "";
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function isValidPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD || "";
  if (!password) return false;
  return crypto.timingSafeEqual(
    Buffer.from(input.padEnd(64, " ")),
    Buffer.from(password.padEnd(64, " "))
  );
}
