import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { apiRoutes } from "./routes";
import { errorHandler } from "./middlewares/error";

const initializeMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize middlewares only in development.
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
};

const initializeExpress = (app: Application) => {
  // Load environment variables from a .env file into process.env.
  dotenv.config();

  initializeMiddlewares(app);

  // Declare REST API routes.
  app.use("/api", apiRoutes);

  app.use(errorHandler);

  app.listen(process.env.PORT, () =>
    console.log(`[app] Server listening on port ${process.env.PORT}.`)
  );
};

initializeExpress(express());
