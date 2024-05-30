import React, { useState } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/modals/Modal";
const BurgerBuilder = () => {
  const addIngredientHandler = (type: any) => {
    let ing: any = { ...ingredients };
    ing[type] = ing[type] + 1;
    setIngredients(ing);
    setTotalPrice(totalPrice + INGREDIENT_PRICES[type]);
  };
  const removeIngredientHandler = (type: any) => {
    let ing: any = { ...ingredients };
    if (ing[type] > 0) {
      ing[type] = ing[type] - 1;
      setIngredients(ing);
      setTotalPrice(totalPrice - INGREDIENT_PRICES[type]);
    }
  };
  const INGREDIENT_PRICES: any = {
    salad: 30,
    cheese: 50,
    meat: 150,
    bacon: 70,
  };

  const [totalPrice, setTotalPrice] = useState<number>(100);
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<object>({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });
  let disabled: any = { ...ingredients };
  for (let prop in disabled) {
    if (disabled[prop] <= 0) disabled[prop] = true;
    else disabled[prop] = false;
  }
  const purchasable: boolean = totalPrice > 100 ? true : false;
  const purchaseHandler = () => {
    setPurchasing(true);
  };
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    alert("You continue!");
  };
  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={totalPrice}
        />
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disabled}
        purchasable={purchasable}
        ordered={purchaseHandler}
        price={totalPrice}
      />
    </>
  );
};

export default BurgerBuilder;
