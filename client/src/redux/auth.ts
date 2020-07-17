import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "./index";

// Types
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  token_version: number;
  activated: boolean;
  updated_at: string;
  created_at: string;
}

interface AuthState {
  session: null | User;
  fetching: boolean;
  authenticated: boolean;
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: User;
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  error: any;
}

interface GithubLoginRequestAction {
  type: typeof GITHUB_LOGIN_REQUEST;
}

interface GithubLoginSuccessAction {
  type: typeof GITHUB_LOGIN_SUCCESS;
  payload: User;
}

interface GithubLoginFailureAction {
  type: typeof GITHUB_LOGIN_FAILURE;
  error: any;
}

interface RegisterArgs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type AuthActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | GithubLoginRequestAction
  | GithubLoginSuccessAction
  | GithubLoginFailureAction;

// Action Types
const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";
const GITHUB_LOGIN_REQUEST = "GITHUB_LOGIN_REQUEST";
const GITHUB_LOGIN_SUCCESS = "GITHUB_LOGIN_SUCCESS";
const GITHUB_LOGIN_FAILURE = "GITHUB_LOGIN_FAILURE";

// Action Creators
const registerRequest = (): AuthActionTypes => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (payload: User): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  payload,
});

const registerFailure = (error: any): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  error,
});

const githubLoginRequest = (): AuthActionTypes => ({
  type: GITHUB_LOGIN_REQUEST,
});

const githubLoginSuccess = (payload: User): AuthActionTypes => ({
  type: GITHUB_LOGIN_SUCCESS,
  payload,
});

const githubLoginFailure = (error: any): AuthActionTypes => ({
  type: GITHUB_LOGIN_FAILURE,
  error,
});

// Async Action Creators
export const registerAction = (inputData: RegisterArgs): AppThunk => async (
  dispatch
) => {
  dispatch(registerRequest());
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    const { status, data, message } = await response.json();
    if (response.ok && status === "success") {
      dispatch(registerSuccess(data.user));
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      dispatch(registerFailure(message));
    }
  } catch (err) {
    dispatch(registerFailure("Failed register action."));
  }
};

export const githubLogin = (code: string): AppThunk => async (dispatch) => {
  dispatch(githubLoginRequest());
  try {
    const response = await fetch(`/api/auth/github?code=${code}`);
    const { status, data, message } = await response.json();
    if (response.ok && status === "success") {
      dispatch(githubLoginSuccess(data.user));
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      dispatch(githubLoginFailure(message));
    }
  } catch (err) {
    dispatch(githubLoginFailure("Failed github login."));
  }
};

// Initial state of reducer.
const initialState: AuthState = {
  session: null,
  fetching: false,
  authenticated: false,
};

// Reducer
export const auth = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case GITHUB_LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case REGISTER_SUCCESS:
    case GITHUB_LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        session: action.payload,
        authenticated: true,
      };
    case REGISTER_FAILURE:
    case GITHUB_LOGIN_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};
