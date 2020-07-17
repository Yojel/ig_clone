import React from "react";
import { FaGithub } from "react-icons/fa";

import styles from "./GithubButton.module.css";

export const GithubButton = () => {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user:email`}
      className={styles.github_button}
    >
      <FaGithub className={styles.github_button_icon} />
      <span>Login with Github</span>
    </a>
  );
};
