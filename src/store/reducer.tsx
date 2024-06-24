import * as actionTypes from "./actions";
interface AddIngredientAction {
  type: typeof actionTypes.ADD_INGREDIENTS;
  ingredientName: "salad" | "bacon" | "cheese" | "meat";
}

interface RemoveIngredientAction {
  type: typeof actionTypes.REMOVE_INGREDIENTS;
  ingredientName: "salad" | "bacon" | "cheese" | "meat";
}

type Action = AddIngredientAction | RemoveIngredientAction;
const INGREDIENT_PRICES = {
  salad: 30,
  cheese: 50,
  meat: 150,
  bacon: 70,
};
const initialState = {
  ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
  totalPrice: 0,
};
const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
          totalPrice:
            state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        },
      };
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
          totalPrice:
            state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        },
      };
    default:
      return state;
  }
};
export default reducer;
