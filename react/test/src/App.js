import React, { useState } from 'react';
import data from "./components/back/Data/Data";
import Header from "./components/front/Header/Header";
import Routes from "./components/front/Routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {

  const { productItems } = data;
  const [cartItems, setCartItems] = useState([]);
  // 解構賦值
  // 相當於 const productItems = data.productItems;
  // 如此一來 就可以直接使用 productItems 這個變數來存取產品清單的資料了

  const handleAddProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setCartItems(cartItems.map((item) => item.id === product.id ? { ...ProductExist, quantity: ProductExist.quantity + 1 } : item));
    }
    else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    }
    else {
      setCartItems(cartItems.map((item) => item.id === product.id ? { ...ProductExist, quantity: ProductExist.quantity - 1 } : item));
    }
  }

  const handleCartClearance = () => {
    setCartItems([]);
  }
  return (
    <div>
      <Router>
        <Header cartItems={cartItems} />
        <Routes productItems={productItems} cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} handleCartClearance={handleCartClearance} />
      </Router>
    </div>
  );
};

export default App;