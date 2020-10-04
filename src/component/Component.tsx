import React, { useContext, useEffect, useState } from "react";
import { AppContext, TAppActions } from "../appcontext/AppReducer";

const ComponentApp: React.FC = () => {
  const {
    appState: { isLoading },
    appDispatch,
  } = useContext(AppContext);
  useEffect(() => {
    const pageLoadingStart = () => {
      appDispatch({ type: TAppActions.isLoading, payload: true });
    };
    const pageLoadingDone = () => {
      appDispatch({ type: TAppActions.isLoading, payload: false });
    };
    pageLoadingStart();
    //set loading time for one second
    setTimeout(() => {
      pageLoadingDone();
    }, 1000);
  }, []);
  console.log("isloading: ", isLoading);
  return (
    <div>
      <h2>ComponentApp</h2>
    </div>
  );
};

export default ComponentApp;
