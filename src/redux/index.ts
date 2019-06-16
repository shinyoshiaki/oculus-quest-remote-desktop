import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers
} from "redux";
import logger from "redux-logger";
import devices, { StateDevices } from "./devices";

const rootReducer = combineReducers({ devices });

export default function createStore() {
  const store = reduxCreateStore(rootReducer, applyMiddleware(logger));
  return store;
}

export interface ReduxState {
  devices: StateDevices;
}
