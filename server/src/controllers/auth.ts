import { catchError } from "../utils";
import { authServices } from "../services";

export const login = catchError(async (req, res) => {
  const { user, accessToken, refreshToken } = authServices.login(req.body);
});

export const register = catchError(async (req, res) => {});

export const logout = catchError(async (req, res) => {});

export const refreshToken = catchError(async (req, res) => {});

export const loadSession = catchError(async (req, res) => {});
