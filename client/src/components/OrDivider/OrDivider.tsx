import React from "react";

import styles from "./OrDivider.module.css";

export const OrDivider = () => {
  return (
    <div className={styles.divider}>
      <hr />
      <span>OR</span>
      <hr />
    </div>
  );
};
