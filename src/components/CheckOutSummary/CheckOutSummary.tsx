import React, { Fragment, useEffect, useState } from "react";
import Burger from "../Burger/Burger";
import classes from "./CheckOutSummary.module.css";
import { useLocation, NavLink, Outlet, useNavigate } from "react-router-dom";
import { TIngredients } from "../../containers/BurgerBuilder/BurgerBuilder";
import Loader from "../../components/ui/Loader/Loader";
import Button from "../ui/Button/Button";
function CheckOutSummary() {
  const [ingredients, setIngredients] = useState<TIngredients | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location?.state) {
      setIngredients(location.state.ingredients);
      setTotalPrice(location.state.price);
    }
  }, []);
  return (
    <Fragment>
      {ingredients ? (
        <>
          <Burger ingredients={ingredients} />
          <Button
            btnType="Danger"
            clicked={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
          <Button
            btnType="Success"
            clicked={() => {
              navigate("/checkout/contact-data", {
                state: { ingredients, totalPrice },
              });
            }}
          >
            Continue
          </Button>
          {/* <NavLink to="/checkout/contact-data">GO</NavLink> */}
        </>
      ) : (
        <Loader />
      )}
      <Outlet />
    </Fragment>
  );
}

export default CheckOutSummary;
