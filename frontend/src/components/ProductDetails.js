import React, { useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { addProductRev, getProductDetails } from '../actions/productAction';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import ReactStars from 'react-stars';
import Reviews from './Reviews';
import Modal from './Modal';
const ProductDetails = () => {
    
    let [unary, setunary] = React.useState(1);
    const [openRev, setOpenRev] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [rating, setRating] = React.useState(0);

    const handleOpenRev = () => setOpenRev(true);

    const params = useParams();
    const dispatch = useDispatch();
    const { loading, error, productDetails } = useSelector(state => state.productDetails);
    const { isAuthenticated, user } = useSelector(state => state.user)
    const { loadingRev, errorRev, productRev } = useSelector(state => state.productRev);
    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id])
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        value: productDetails && productDetails.ratings,
        count: 5,
        size: 24,
        color2: '#ffd700',
        half: true,
    };
    const ratingHandler = (newRating) => {
        setRating(newRating);
    };
    const revData = {
        productId: productDetails && productDetails._id,
        name: user && user.name,
        comment,
        rating
    };
    const addReview = (e) => {
        e.preventDefault();
        dispatch(addProductRev(revData));
    };

    const addToCart = () => {
        let cartArr;
        if (localStorage.getItem('cart') === null) {
            cartArr = [];
        } else {
            cartArr = JSON.parse(localStorage.getItem('cart'));
        };
        const isItemExist = cartArr.find(id => id.productId === productDetails._id);
        const cartData = productDetails && {
            productId: productDetails._id,
            itemQty: unary,
            name: productDetails.name,
            price: productDetails.price,
            image: productDetails.images[0].url,
            stock: productDetails.stock,
        };
        if (isItemExist) {
            cartArr.forEach((item, index) => {
                if (item.productId === productDetails._id) {
                    cartArr[index] = cartData;
                }
            });
        } else {
            cartArr.push(cartData);
        }
        if (unary > 0) {
            localStorage.setItem('cart', JSON.stringify(cartArr));
        };
    }
    return <React.Fragment>
        {loading
            ? <div className='w-full h-screen relative'><Loader /></div>
            : <div>
                <div className='w-full py-16 flex flex-row justify-center items-center flex-wrap gap-0 bg-blue-50'>
                    <div className='sm:px-2 md:px-2 lg:px-7 border border-blue self-stretch flex flex-col items-center justify-center'>
                        <Carousel
                            showThumbs={false}
                            className='w-[400px] sm:w-[300px] sm:py-2 self-stretch'
                        >
                            {productDetails && productDetails.images
                                .map((pic) =>
                                    <img
                                        key={pic._id}
                                        src={pic.url}
                                        alt={productDetails.name}
                                    />
                                )}
                        </Carousel>
                    </div>
                    {
                        productDetails &&
                        <div
                            className='w-[400px] sm:w-[319px] md:w-[418px] md:px-2 self-stretch flex flex-col justify-start gap-2 items-start sm:px-2 pl-9 border border-blue py-2'
                        >
                            <span>{productDetails.name}</span>
                            <span>{'proudct # ' + productDetails._id}</span>
                            <hr className='bg-blue-400 w-[300px]' />
                            <ReactStars
                                {...options}
                            />
                            <hr className='bg-blue-400 w-[300px]' />
                            <h3 className='text-bold text-2xl'>{productDetails.price} Rs</h3>
                            <div className='w-[300px] flex flex-row items-center gap-2 justify-start'>
                                <div className='flex flex-row gap-0'>
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
                                <button onClick={addToCart} className='rounded-xl w-28 bg-emerald-400 py-1'>Add to Cart</button>
                            </div>
                            <hr className='bg-blue-400 w-[300px]' />
                            <span className='text-xl'>
                                Status: <b className={productDetails.stock > 0 ? 'text-emerald-400' : 'text-[red]'}>
                                    {productDetails.stock > 0 ? "InStock" : "OutOfStock"}
                                </b>
                            </span>
                            <hr className='bg-blue-400 w-[300px]' />
                            <h3 className='text-xl'>Description: </h3>
                            <p className='w-[300px] text-justify text-sm'>{productDetails.description}</p>
                            <button onClick={handleOpenRev} className='rounded-xl w-32 bg-emerald-400 p-1'>Submit Review</button>
                        </div>
                    }
                </div>
                {<Modal open={openRev} setOpen={setOpenRev}>
                    {isAuthenticated
                        ?
                        <form
                            onSubmit={addReview}
                            className='w-full flex flex-col gap-2 relative'>
                            {loadingRev && <Loader />}
                            {errorRev && <span className='w-full text-center text-[red]'>{errorRev}</span>}
                            {productRev && <span className='w-full text-center text-emerald-400'>{productRev.message}</span>}
                            <div className='w-full flex items-center justify-center'>
                                <ReactStars
                                    edit={true}
                                    color="rgba(20,20,20,0.1)"
                                    value={rating}
                                    count={5}
                                    onChange={ratingHandler}
                                    size={24}
                                    color2='#ffd700'
                                    half={true}
                                />
                            </div>
                            <div>
                                <textarea value={comment} minrows={4} onChange={(e) => setComment(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Product Review' required />
                            </div>
                            <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>
                        </form>
                        :
                        <span className='w-full text-center p-3'>You need to Login to Add Review</span>}
                </Modal>}
                {/* Reviews */}
                <div className='w-full flex flex-row items-center justify-start sm:justify-center flex-wrap bg-blue-50'>
                    <div className='w-full flex flex-col items-center justify-center'>
                        <h1 className='w-full text-center text-3xl mb-2'>Reviews</h1>
                        <hr className='bg-blue-400 w-[300px]' />
                    </div>
                    <div className='w-full flex flex-row flex-wrap items-center justify-center py-4 gap-4'>
                        {productDetails && productDetails.reviews.length > 0 ? productDetails.reviews
                            .map((review) => <Reviews key={review._id} review={review} />
                            ) : <span className='text-2xl w-[300px] border border-blue-100 text-center bg-blue-100'>No reviews Yet</span>}
                    </div>
                </div>
            </div>
        }
    </React.Fragment>
}

export default ProductDetails;