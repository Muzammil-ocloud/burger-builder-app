import React from "react";

import Button from "../../ui/Button/Button";
interface IOrderSummary {
  ingredients: any;
  purchaseCancelled: () => void;
  purchaseContinued: () => void;
  price: number;
}
const orderSummary = ({
  ingredients,
  purchaseCancelled,
  purchaseContinued,
  price,
}: IOrderSummary) => {
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <strong> Total: {price}</strong>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default orderSummary;
