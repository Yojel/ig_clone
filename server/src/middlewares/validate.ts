import Joi, { ObjectSchema } from "@hapi/joi";
import { Request, Response, NextFunction } from "express";

import { catchError } from "../utils";

export const schemas = {
  register: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(32),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(32),
  }),
};

export const validate = (schema: ObjectSchema, props: keyof Request) =>
  catchError((req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[props], { abortEarly: false });

    if (error) {
      return res.status(422).json({
        status: "error",
        code: 422,
        error: error.details.reduce((obj: any, cv) => {
          obj[cv.path[0]] = cv.message;
          return obj;
        }, {}),
      });
    }

    next();
  });
