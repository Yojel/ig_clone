import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../database";
import { AppError } from "../utils/";

interface loginArgs {
  email: string;
  password: string;
}

export const login = async (data: loginArgs) => {
  const { email, password } = data;
  // Check whether user with given e-mail address exists in database.
  const userWithEmail = await db("users").select().where({ email });
  if (!userWithEmail.length) {
    throw new AppError(404, "User with given e-mail address not found.");
  }
  const user = userWithEmail[0];
  // Check whether the passwords match.
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError(401, "Invalid password.");
  }
  // Payload for token creation.
  const payload = {
    userId: user.id,
    tokenVersion: user.token_version,
  };
  // Create refresh token.
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION!,
  });
  // Create access token.
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!,
  });
  // Omit password from user object.
  const { password: omit, ...rest } = user;
  return { user: rest, refreshToken, accessToken };
};

interface registerArgs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const register = async (data: registerArgs) => {
  const { name, email, password } = data;
  // Check whether e-mail address is already taken.
  const userWithEmail = await db("users").select().where({ email });
  if (userWithEmail.length) {
    throw new AppError(422, "E-mail address is already taken.");
  }
  // Check whether name is already taken.
  const userWithName = await db("users").select().where({ name });
  if (userWithName.length) {
    throw new AppError(422, "Name is already taken.");
  }
  // Hash the password.
  const hashedPassword = await bcrypt.hash(password, 12);
  // Insert new user into the database.
  const newUser = await db("users").insert(
    {
      name,
      email,
      password: hashedPassword,
    },
    "*"
  );
  const user = newUser[0];
  // Payload for token creation.
  const payload = {
    userId: user.id,
    tokenVersion: user.token_version,
  };
  // Create refresh token.
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION!,
  });
  // Create access token.
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!,
  });
  // Omit password from user object.
  const { password: omit, ...rest } = user;
  return { user: rest, refreshToken, accessToken };
};

interface payloadProps {
  userId: number;
  tokenVersion: number;
}

export const refreshToken = async (refreshToken: string) => {
  // Check whether refresh token is valid.
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  // Check whether user with user id and token version exists.
  const userExists = await db("users")
    .select()
    .where({
      id: (payload as payloadProps).userId,
      token_version: (payload as payloadProps).tokenVersion,
    });
  if (!userExists.length) {
    throw new AppError(401, "Refresh token is invalid.");
  }
  const user = userExists[0];
  const newPayload = { userId: user.id, tokenVersion: user.token_version };
  // Create access token.
  const accessToken = jwt.sign(newPayload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!,
  });
  return { accessToken };
};
