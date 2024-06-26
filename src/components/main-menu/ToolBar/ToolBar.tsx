import React from "react";
import classes from "./ToolBar.module.css";
import logoIcon from "../../../assets/icons/burger.png";
import hamBurgerIcon from "../../../assets/icons/hamburger.png";
import SideDrawer from "../SideDrawer/SideDrawer";
import { useNavigate } from "react-router-dom";
const ToolBar = () => {
  const [open, setOpen] = React.useState(false);
  const openSideDrawer = () => {
    setOpen(true);
  };
  const closeSideDrawer = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <>
      <SideDrawer open={open} closeSideDrawer={closeSideDrawer} />
      <div className={classes.container}>
        <div className={classes.toolBar}>
          <img
            className={classes.hamBurger}
            src={hamBurgerIcon}
            alt="ham-burger"
            onClick={openSideDrawer}
          />
          <img className={classes.logo} src={logoIcon} alt="logo" />
          <div className={classes.menu}>
            <div onClick={() => navigate("/")}>Burger Builder</div>
            <div onClick={() => navigate("/orders")}>Orders</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ToolBar;
