import React from "react";

import styles from "./NotFoundBlock.module.scss";
console.log(styles);

const NotFoundBlock:React.FC = () => {
  return <h1 className={styles.root}>ничего не найдено 😯</h1>;
};

export default NotFoundBlock;
