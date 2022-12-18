import React, { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [items, setItems] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const getTotalPrice = () => {
    let price = 0.0;
    for (let item of items) {
      price += item.price;
    }
    setTotalPrice(price.toFixed(2));
  };

  const addToCart = itemObj => {
    setItems(prevState => [...prevState, itemObj]);
  };

  const removeFromCart = name => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].name === name) {
        console.log(
          "You want to remove: " + items[i].name + " from index: " + i
        );
        items.splice(i, 1);
        forceUpdate();
        return;
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ items, totalPrice, addToCart, removeFromCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
