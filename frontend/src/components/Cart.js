import React, { useEffect } from 'react';
import CartProduct from './CartProduct';

const Cart = () => {
  const [cartItems, setCartItems] = React.useState([]);
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart')));
  }, [cartItems])
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
        ?
        cartItems.map((item) =>
          <CartProduct
            key={item.productId}
            item={item}
          />)
        :
        <span className='w-full text-center text-xl p-2'>No item in Cart</span>}
    </div>
  )
}

export default Cart;
