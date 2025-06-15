import React from "react";
import css from "./AppLayout.module.css";

const AppLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>{children}</div>
    </div>
  );
};

export default AppLayout;
