import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartProduct from './CartProduct';
import { removeCartItem } from '../actions/addToCart';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping")
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <h1 className='w-full text-center text-xl mt-2'>My Cart</h1>
      <div className='w-full xl:w-[95%] mt-3 bg-emerald-500 text-white flex flex-row border border-emerald-400 p-2 gap-4 items-center justify-between'>
        <h2 className='text-bold w-[60%]'>Product</h2>
        <h2 className='text-bold w-[20%]'>ItemQty</h2>
        <h2 className='text-bold w-[20%] text-end'>SubTotal</h2>
      </div>
      {cartItems &&
        cartItems.length > 0
        ? <>
          {cartItems.map((item) =>
            <CartProduct
              key={item.productId}
              item={item}
              deleteCartItem={removeCartItem}
            />)}
          <div className='w-full xl:w-[95%] flex flex-row items-center justify-end'>
            <div className='w-[40%] flex flex-col items-center justify-end'>
              <hr className='w-full my-4 bg-emerald-400' />
              <div className='w-full flex flex-row justify-between'>
                <span>Gross Total</span>
                <span>{cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)}</span>
              </div>
              <div className='w-full flex items-center justify-center'>
                <button onClick={checkoutHandler} className='bg-emerald-400 py-1 px-3 rounded-sm'>Check Out</button>
              </div>
            </div>
          </div>
        </>
        :
        <span className='w-full text-center text-xl p-2'>No item in Cart</span>}
    </div>
  )
}

export default Cart;
