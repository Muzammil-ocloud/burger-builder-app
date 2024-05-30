import React from "react";

import classes from "./Backdrop.module.css";
interface IBackdrop {
  show: boolean;
  clicked: () => void;
}
const backdrop = (props: IBackdrop) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
