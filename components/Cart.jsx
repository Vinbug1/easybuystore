import React,{useRef} from 'react';
import Link from 'next/Link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import {urlFor} from '../lib/client';

const Cart = () => {
  const { totalQuantities, totalPrice, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();
  const cartRef = useRef();
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button className="cart-heading" type="button" onClick={() => setShowCart(false)}>
             <AiOutlineLeft />
             <span className="heading">Your Cart</span>
             <span classname="cart-num-items">({totalQuantities} item)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping  size={150}/>
            <p>Your cart is empty</p>
            <Link href='/'>
                 <button type="button" onClick={() => setShowCart(false)} className="btn">
                     continue shopping
                 </button>
            </Link>
          </div>
        )}
        <div>
            {cartItems.length >= 1 && cartItems.map((item ) => ( 
            <div className="product" key={item._id}>
              <div className="cart-item-img">
                <img src={urlFor(item?.image[0])} className="cart-product-image" />
                 <div className="item-desc">
                 <div className="flex top ">
                     <h5>{item.name}</h5>
                     <h4>{item.price}</h4>
                 </div>
                 <div className="flex bottom">
                     <div>
                     <p className="quantity-desc">
                            <span className="minus" onClick={() => toggleCartItemQuantity(item._id,'dec')}>
                              <AiOutlineMinus />
                              </span>
                            <span className="num" >{item.quantity}</span>
                            <span className="plus" onClick={() => toggleCartItemQuantity(item._id,'inc')}>
                              <AiOutlinePlus /></span>
                      </p>
                     </div>
                     <div>
                       <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                           <TiDeleteOutline />
                       </button>
                     </div>
                  </div>
                 </div>
                </div>
              </div>
            ))}
        </div>
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal: </h3>
                <h3>${totalPrice} </h3>
              </div>
              <div className="button-container">
                  <button type="button" className="btn" onClick="">
                     Pay with stripe 
                  </button>
              </div>
            </div>
          )}
      </div>
         
      </div>
  )
}

export default Cart