import React, { createContext, useReducer } from 'react';
import t from 'prop-types';

export const Context = createContext();

const produtos = {
  valor_total: 0,
  valor_unitario: 0,
  products: JSON.parse(localStorage.getItem('products'))
    ? JSON.parse(localStorage.getItem('products'))
    : [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PRODUCTS':
      const newStateProducts = { ...state };
      newStateProducts.products = action.payload;
      return newStateProducts;
      break;

    default:
      break;
  }
  return state;
}

export const ProviderContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, produtos);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

ProviderContext.protoTypes = {
  children: t.node.isRequired,
};
