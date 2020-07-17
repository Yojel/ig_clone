import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./Github.module.css";
import { githubLogin } from "../../redux/auth";
import { Loading } from "../../components/Loading";

export const Github = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) {
      return;
    }
    dispatch(githubLogin(code));
  }, []);
  return (
    <div className={styles.github}>
      <Loading />
    </div>
  );
};
