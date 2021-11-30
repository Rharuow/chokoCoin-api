import { Request, Response } from "express";

export class RootController {
  run(req: Request, res: Response) {
    return res.send("Welcome to api service");
  }
}
