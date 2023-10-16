import {} from "";
import { IAdmin, IUser } from "./src/appCommon/utils/types/commonTypes";

declare global {
  namespace Express {
    interface Request {
      admin: IAdmin;
      user: IUser;
      upFiles: string[];
    }
  }
}
