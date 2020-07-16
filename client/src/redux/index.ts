import reduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { auth } from "./auth";

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  auth,
});

const middleware = [reduxThunk];

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
