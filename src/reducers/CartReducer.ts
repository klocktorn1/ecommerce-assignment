import { Cart } from "../models/Cart";
import { IProduct } from "../models/IProduct";

export interface ICartAction {
  payload: string;
  type: ICartActionType;
}

export enum ICartActionType {
  ADDED,
  INCREASED,
  DECREASED,
  REMOVED,
  EMPTIED,
}

export const CartReducer = (cartState: Cart[], action: ICartAction): Cart[] => {
  switch (action.type) {
    case ICartActionType.ADDED: {
      const p: IProduct = JSON.parse(action.payload);
      const foundInCart = cartState.find((ci) => ci.product.id === p.id);

      if (!foundInCart) {
        return [...cartState, new Cart(p, 1)];
      }

      return cartState.map((ci) => {
        if (ci.product.id === p.id) {
          return { ...ci, amount: ci.amount + 1 };
        }
        return ci;
      });
    }
    case ICartActionType.INCREASED: {
      const productId: number = +action.payload;
      return cartState.map((ci) => {
        if (ci.product.id === productId) {
          return { ...ci, amount: ci.amount + 1 };
        }
        return ci;
      });
    }
    case ICartActionType.DECREASED: {
      const productId: number = +action.payload;
      return cartState.map((ci) => {
        if (ci.product.id === productId) {
          return { ...ci, amount: ci.amount - 1 };
        }
        return ci;
      });
    }
    case ICartActionType.REMOVED: {
      const productId: number = +action.payload;
      const cartStateRemoved = cartState.filter(
        (ci) => ci.product.id !== productId
      );
      if (cartStateRemoved.length === 0) {
        localStorage.removeItem("cart")
      }
      console.log("Item removed:", cartStateRemoved);
      return [...cartStateRemoved]
    }
    case ICartActionType.EMPTIED: {
      return [];
    }
    default:
      return cartState; 
  }
};
