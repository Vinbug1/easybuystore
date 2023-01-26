import React,{createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
 let foundProduct;
 let index;
 const [showCart,setShowCart] = useState(false);
 const [cartItems,setCartItems] = useState([]);
 const [totalPrice,setTotalPrice] = useState(0);
 const [totalQuantities,setTotalQuantities] = useState(0);
 const [qty,setQty] = useState(1);
 
 const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if(checkProductInCart){
        const updatedCartitems = cartItems.map((cartProduct) =>{
            if(cartProduct._id === product._id) return {
             ...cartProduct, quantity: cartProduct.quantity + quantity
            }           
        })
        setCartItems(updatedCartitems);
    }else{
        product.quantity = quantity;
        setCartItems([...cartItems, {...product, quantity}]);        
    }
    toast.success(`${qty} ${product.name} added to cart`);
}

const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartitems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartitems);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price * product.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - product.quantity);
    setCartItems(newCartitems);
    toast.success(`${product.name} removed from cart`);
}
const toggleCartItemQuantity = (id, value) => {
    const newCartItems = cartItems.filter((item) => item._id !== id);
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

   if(value === 'inc'){
           setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
           setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
           setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
   }else if(value === 'dec'){
    if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    } }
  }

 const incQty = () =>{ setQty((preQty) => preQty + 1); }
 const decQty = () =>{ setQty((preQty) => { if(preQty - 1 < 1) return 1; return preQty - 1}); }

 return (
    <Context.Provider value={{ showCart,totalPrice,cartItems,totalQuantities,qty, incQty,decQty, onAdd, showCart,setShowCart, toggleCartItemQuantity,onRemove}}>
        {children}
    </Context.Provider>
 )
}
export const useStateContext = () =>  useContext(Context);