import React from 'react';

const CartProduct = ({ item }) => {
    let [unary, setunary] = React.useState(item.itemQty);
    const onRmoveItem = (currentProd) => {
        let items = JSON.parse(localStorage.getItem('cart'));
        const filteredArr = items.filter((item) => item.productId !== currentProd);
        items = filteredArr;
        localStorage.setItem('cart', JSON.stringify(items));
    };

    return (item &&
        <div className='w-full xl:w-[95%] flex flex-row border border-emerald-400 border-t-0 p-2 gap-4 items-center justify-between'>
            <div className='w-[60%] flex flex-row flex-wrap'>
                <div className='w-32 h-32'>
                    <img src={item.image} />
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
                    onClick={() => setunary(unary -= 1)}
                >
                    -
                </button>
                <span className='w-14 flex items-center justify-center border border-blue-400'>{unary}</span>
                <button
                    className='border border-blue-400 w-6 bg-blue-400 text-[#ffffff]'

                    onClick={() => setunary(unary += 1)}
                >
                    +
                </button>
            </div>
            <div className='w-[20%] flex flex-row items-end justify-end'>
                <span><b>PKR</b> {unary * item.price}</span>
            </div>
        </div>
    )
}

export default CartProduct;
