import React from "react";

import classes from "./Modal.module.css";

import Backdrop from "../../components/ui/Backdrop/Backdrop";
interface IModal {
  show: boolean;
  modalClosed: () => void;
  children: any;
}
const modal = (props: IModal) => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </>
);

export default React.memo(modal);
