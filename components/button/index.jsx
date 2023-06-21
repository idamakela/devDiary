import classNames from "classnames";
import styles from "./button.module.css";

export default function Button({ children, className, ...props }) {
  return (
    <button className={classNames(styles.container, className)} {...props}>
      {children}
    </button>
  );
}
