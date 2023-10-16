import { NextFunction, Request, Response } from "express";
import StatusCode from "../../utils/miscellaneous/statusCode";
import ResMsg from "../../utils/miscellaneous/responseMessage";
import { IAdmin, IUser } from "../../appCommon/utils/types/commonTypes";
import config from "../../utils/config/config";
import Lib from "../../utils/lib/lib";

class AuthChecker {
  // admin auth checker
  public adminAuthChecker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    }

    const authSplit = authorization.split(" ");

    if (authSplit.length !== 2) {
      return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
        success: false,
        message: ResMsg.HTTP_UNAUTHORIZED,
      });
    }

    const verify = Lib.verifyToken(
      authSplit[1],
      config.JWT_SECRET_ADMIN
    ) as IAdmin;

    if (!verify) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    } else {
      if (verify.type !== "admin" || verify.status === false) {
        return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
          success: false,
          message: ResMsg.HTTP_UNAUTHORIZED,
        });
      } else {
        req.admin = verify as IAdmin;
        next();
      }
    }
  };

  // member auth checker
  public memberAuthChecker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    }

    const authSplit = authorization.split(" ");
    if (authSplit.length !== 2) {
      return res.status(StatusCode.HTTP_UNAUTHORIZED).json({
        success: false,
        message: ResMsg.HTTP_UNAUTHORIZED,
      });
    }

    const verify = Lib.verifyToken(
      authSplit[1],
      config.JWT_SECRET_USER
    ) as IUser;

    if (!verify) {
      return res
        .status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ success: false, message: ResMsg.HTTP_UNAUTHORIZED });
    } else {
      req.user = verify;
      next();
    }
  };
}

export default AuthChecker;
