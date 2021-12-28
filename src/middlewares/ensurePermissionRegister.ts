import { NextFunction, Request, Response } from "express";
require("dotenv").config();

export function ensurePermissionRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { secret } = req.headers;

  if (!secret || secret !== process.env.USER_SECRET)
    return res.status(401).send("Not a sailor");

  return next();
}
