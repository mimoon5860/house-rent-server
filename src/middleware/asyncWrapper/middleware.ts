import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import AbstractServices from "../../abstract/abstract.service";
import CustomError from "../../utils/lib/customEror";

type Func = (req: Request, res: Response, next: NextFunction) => Promise<void>;

class Wrapper extends AbstractServices {
  // CONTROLLER ASYNCWRAPPER
  public wrap(schema: Joi.ObjectSchema<any> | null, cb: Func) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (schema) {
          const value = await schema.validateAsync(req.body);
          req.body = value;
        }

        await cb(req, res, next);
      } catch (err: any) {
        if (err.isJoi) {
          next(
            new CustomError(
              err.message,
              this.StatusCode.HTTP_UNPROCESSABLE_ENTITY
            )
          );
        } else {
          await this.createException(
            req.baseUrl,
            "Error from async wrapper",
            err.message,
            err.line
          );
          next(new CustomError(err.message, err.status));
        }
      }
    };
  }
}

export default Wrapper;
