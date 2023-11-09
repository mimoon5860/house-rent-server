import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import AbstractServices from "../../abstract/abstract.service";
import CustomError from "../../utils/lib/customEror";

type Func = (req: Request, res: Response, next: NextFunction) => Promise<void>;

type Validators = {
  bodySchema?: Joi.ObjectSchema<any>;
  parmSchema?: Joi.ObjectSchema<any>;
  querySchema?: Joi.ObjectSchema<any>;
};

class Wrapper extends AbstractServices {
  // CONTROLLER ASYNCWRAPPER
  public wrap(shema: Validators | null, cb: Func) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { params, query, body } = req;

        console.log({ body });
        if (shema) {
          if (shema.bodySchema) {
            const validateBody = await shema.bodySchema.validateAsync(body);
            req.body = validateBody;
          }
          if (shema.parmSchema) {
            const validateParams = await shema.parmSchema.validateAsync(params);
            req.params = validateParams;
          }
          if (shema.querySchema) {
            const validateQuery = await shema.querySchema.validateAsync(query);
            req.query = validateQuery;
          }
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
