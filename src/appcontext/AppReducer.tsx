import React, { Dispatch, createContext, useReducer } from "react";
import Storage from "../services/Storage";

enum TAppActions {
  isLoading = "IS_LOADING",
  isPlaying = "SET_PLAY",
  notifications = "NOTIFICATION",
}

type State = {
  isPlaying: boolean;
  isLoading: boolean;
  notifications: string;
};

type Action =
  | { type: TAppActions.isLoading; payload: boolean }
  | { type: TAppActions.notifications; payload: string }
  | { type: TAppActions.isPlaying; payload: boolean };

const initialState: State = {
  isLoading: false,
  isPlaying: false,
  notifications:
    Storage.get(TAppActions.notifications) === null
      ? ""
      : Storage.get(TAppActions.notifications),
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case TAppActions.isLoading:
      return { ...state, isLoading: action.payload };
    case TAppActions.isPlaying:
      return { ...state, isPlaying: action.payload };
    case TAppActions.notifications:
      Storage.set(TAppActions.notifications, action.payload);
      return { ...state, notifications: action.payload };
    default:
      //   console.log("Received dispatch: ", action);
      return { ...state };
  }
};

const AppContext = createContext<{
  appState: State;
  appDispatch: Dispatch<any>;
}>({
  appState: initialState,
  appDispatch: () => null,
});

const AppProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ appState: state, appDispatch: dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext, TAppActions };
