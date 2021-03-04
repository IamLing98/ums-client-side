import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import {logger} from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk"

export function configureStore(initialState) {
  const middleware = [thunk, promiseMiddleware, logger];

  const store = createStore(reducers, initialState, applyMiddleware(...middleware));

  return store;
}
