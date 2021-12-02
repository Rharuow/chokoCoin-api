import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

interface IUserSession {
  user: { email: string; id: string };
  iat: number;
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  const { user } = jwt.verify(
    token.split(" ")[1],
    process.env.SECRET
  ) as IUserSession;

  const userRepository = getCustomRepository(UserRepository);

  const isUser = await userRepository.findOne(user.id);

  if (
    !token ||
    !isUser ||
    user.email !== process.env.ADMIN_MAIL ||
    isUser.email !== process.env.ADMIN_MAIL
  )
    return res.status(401).json({ message: "Unauthorized" });

  req.headers.decodedSessionUserId = user.id;

  return next();
}
