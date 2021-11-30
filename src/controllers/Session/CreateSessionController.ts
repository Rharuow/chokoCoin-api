import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateSessionService } from "../../services/Session/CreateSessionService";

export class CreateSessionController {
  async handle(req: Request, res: Response) {
    const createSessionService = new CreateSessionService();

    try {
      const user = await createSessionService.execute(
        req.body.email,
        req.body.password
      );

      console.log("private key = ", process.env.SECRET);

      const token = jwt.sign(
        { user: { email: user.email } },
        process.env.SECRET
      );

      return res.json({ token });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}
