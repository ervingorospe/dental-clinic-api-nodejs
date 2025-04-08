import { Request, Response } from "express";
import { UserService } from "@modules/user/service";
import { catchAsync } from "@utils/catch-async";

export class UserController {
  static test =  catchAsync(async (req: Request, res: Response) => {
    const message = UserService.test();
    res.status(200).json({ message });
  });
}
