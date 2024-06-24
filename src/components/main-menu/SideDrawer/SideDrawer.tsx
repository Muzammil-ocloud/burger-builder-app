import React from "react";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../ui/Backdrop/Backdrop";
import logoIcon from "../../../assets/icons/burger.png";
import { useNavigate } from "react-router-dom";
interface ISideDrawer {
  open: boolean;
  closeSideDrawer: () => void;
}

const SideDrawer = (props: ISideDrawer) => {
  const navigate = useNavigate();
  return (
    <div>
      <BackDrop show={props.open} clicked={props.closeSideDrawer} />
      <div
        className={classes.sideDrawer}
        style={{
          transform: props.open ? "translateX(0)" : "translateX(-100vw)",
        }}
      >
        <img className={classes.logo} src={logoIcon} alt="logo" />
        <div className={classes.menu}>
          <div
            onClick={() => {
              navigate("/");
              props.closeSideDrawer();
            }}
          >
            Burger Builder
          </div>
          <div
            onClick={() => {
              navigate("/orders");
              props.closeSideDrawer();
            }}
          >
            Orders
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(SideDrawer);
