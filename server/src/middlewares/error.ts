import { ErrorRequestHandler } from "express";

import { AppError } from "../utils";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    code: 500,
    message: "Something went wrong.",
  });
};
