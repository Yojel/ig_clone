import { catchError, AppError } from "../utils";
import { authServices } from "../services";

export const login = catchError(async (req, res) => {
  const { user, accessToken, refreshToken } = await authServices.login(
    req.body
  );
  // Set refresh token as HTTP-only cookie.
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION!),
  });
  res.json({
    status: "success",
    data: {
      user,
      accessToken,
    },
  });
});

export const register = catchError(async (req, res) => {
  const { user, accessToken, refreshToken } = await authServices.register(
    req.body
  );
  // Set refresh token as HTTP-only cookie.
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION!),
  });
  res.json({
    status: "success",
    data: {
      user,
      accessToken,
    },
  });
});

export const logout = catchError(async (_req, res) => {
  res.clearCookie("refreshToken");
  res.json({
    status: "success",
    message: "Successfully logout.",
  });
});

export const refreshToken = catchError(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new AppError(400, "Refresh token not found.");
  }
  const { accessToken } = await authServices.refreshToken(refreshToken);
  res.json({
    status: "success",
    data: {
      accessToken,
    },
  });
});

export const loadSession = catchError(async (req, res) => {
  res.json({
    status: "success",
    data: {
      user: req,
    },
  });
});

export const github = catchError(async (req, res) => {
  const { code } = req.query;
  if (typeof code !== "string") {
    throw new AppError(401, "Github code not found.");
  }
  const { githubAccessToken } = await authServices.githubToken(code);
  const { user, accessToken, refreshToken } = await authServices.githubData(
    githubAccessToken
  );
  // Set refresh token as HTTP-only cookie.
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION!),
  });
  res.json({
    status: "success",
    data: {
      user,
      accessToken,
    },
  });
});
