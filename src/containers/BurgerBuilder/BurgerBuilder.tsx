import React, { useState, useEffect } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/modals/Modal";
import axios from "axios";
import Loader from "../../components/ui/Loader/Loader";
// import Swal from "sweetalert2";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";
import { Router, useNavigate, useSearchParams } from "react-router-dom";
export type TIngredients = {
  salad: number;
  cheese: number;
  meat: number;
  bacon: number;
};
const BurgerBuilder = (props: any) => {
  console.log(props.ings);
  
  // const { ings, totalPrice, onIngredientAdded, onIngredientRemoved } = props;
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get("/ingredients.json").then((res) => {
      setIngredients(res.data);
      setDisplay(true);
    });
  }, []);

  // const addIngredientHandler = (type: any) => {
  //   let ing: any = { ...ingredients };
  //   ing[type] = ing[type] + 1;
  //   setIngredients(ing);
  //   setTotalPrice(totalPrice + INGREDIENT_PRICES[type]);
  // };
  // const removeIngredientHandler = (type: any) => {
  //   let ing: any = { ...ingredients };
  //   if (ing[type] > 0) {
  //     ing[type] = ing[type] - 1;
  //     setIngredients(ing);
  //     setTotalPrice(totalPrice - INGREDIENT_PRICES[type]);
  //   }
  // };

  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<TIngredients | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  let disabled: any = { ...ingredients };
  for (let prop in disabled) {
    if (disabled[prop] <= 0) disabled[prop] = true;
    else disabled[prop] = false;
  }
  const purchasable: boolean = props.totalPrice > 100 ? true : false;
  const purchaseHandler = () => {
    setPurchasing(true);
  };
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseContinueHandler = () => {
    // props.history.push("/checkout");

    navigate("/checkout", {
      state: { ingredients: { ...ingredients }, price: props.totalPrice },
    });
    // navigate("/checkout", { relative: "path" });
    // let data = {
    //   name: "Muzammil",
    //   phone: "03124232982",
    //   ingredients,
    //   totalPrice,
    // };
    // axios
    //   .post("/orders.json", data)
    //   .then((res) => {
    //     console.log(res);
    //     Swal.fire("Success!", "Order Placed Successfully", "success");
    //     setPurchasing(false);
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
  };
  return (
    <>
      {display ? (
        <>
          {
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
              <OrderSummary
                ingredients={props.ings}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={props.totalPrice}
              />
            </Modal>
          }
          <Burger ingredients={props.ings} />
          <BuildControls
            ingredientAdded={(type: any) => props.onIngredientAdded(type)}
            ingredientRemoved={(type: any) => props.onIngredientRemoved(type)}
            disabled={props.ings}
            purchasable={purchasable}
            ordered={purchaseHandler}
            price={props.totalPrice}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onIngredientAdded: (ingName: string) =>
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName }),
    onIngredientRemoved: (ingName: string) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
