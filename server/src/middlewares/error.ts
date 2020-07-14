import { ErrorRequestHandler } from "express";

import { AppError } from "../utils";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.message);
  }

  res.status(500).json("Something went wrong on the server.");
};
