import React from 'react';
import { addItemsToCart } from '../actions/addToCart';
import { useDispatch } from 'react-redux';
const CartProduct = ({ item, deleteCartItem }) => {
    const dispatch = useDispatch();

    const onRmoveItem = (id) => {
        dispatch(deleteCartItem(id));
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };
    const increaseQty = (id, quantity, stock) => {
        let newqTY = quantity + 1;
        if (stock <= quantity) {
            return;
        };
        dispatch(addItemsToCart(id, newqTY));
    }
    const decreaseQty = (id, quantity) => {
        let newqTY = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newqTY));
    }

    return (item &&
        <div className='w-full xl:w-[95%] flex flex-row border border-emerald-400 border-t-0 p-2 gap-4 items-center justify-between'>
            <div className='w-[60%] flex flex-row flex-wrap'>
                <div className='w-32 h-32'>
                    <img src={item.image} alt={item.name} />
                </div>
                <div className='flex flex-col gap-4 sm:gap-0 sm:mt-2'>
                    <span className='sm:text-sm'>{item.name}</span>
                    <span className='sm:text-sm'>Price: PKR {item.price}</span>
                    <button onClick={() => onRmoveItem(item.productId)} className='border rounded-lg text-white bg-emerald-400 border-emerald-400 sm:text-sm'>remove</button>
                </div>
            </div>
            <div className='flex w-[20%] flex-row gap-0'>
                <button
                    className='border border-blue-400 w-6 bg-blue-400 text-[#ffffff]'
                    onClick={() => decreaseQty(item.productId, item.quantity)}
                >
                    -
                </button>
                <span className='w-14 flex items-center justify-center border border-blue-400'>{item.quantity}</span>
                <button
                    className='border border-blue-400 w-6 bg-blue-400 text-[#ffffff]'
                    onClick={() => increaseQty(item.productId, item.quantity, item.stock)}
                >
                    +
                </button>
            </div>
            <div className='w-[20%] flex flex-row items-end justify-end'>
                <span><b>PKR</b> {item.quantity * item.price}</span>
            </div>
        </div>
    )
}

export default CartProduct;
