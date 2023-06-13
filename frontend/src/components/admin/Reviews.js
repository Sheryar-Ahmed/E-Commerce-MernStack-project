import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton'
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DenseTable from './Table';
import { createData } from './Utilis/createData';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductReviewAdminAction, getProductReviewAdminAction } from '../../actions/productAction';
import Loader from '../Loader';
import ModalBasic from '../Modal';


const Reviews = () => {
    const [search, setSearch] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const getReviews = (e) => {
        e.preventDefault();
        dispatch(getProductReviewAdminAction(search))
    };
    const deleteReview = (e, id) => {
        e.preventDefault();
        dispatch(deleteProductReviewAdminAction(search, id));
    };
    const { productReviewList, productReviewListLoading, productReviewListError } = useSelector(state => state.productReviewList);
    const { DelProductReview, DelProductReviewLoading, DelProductReviewError } = useSelector(state => state.DelProductReview);

    const cell = ['Review ID', 'User', 'Comment', 'Rating', 'Actions'];

    const rows = productReviewList && productReviewList.map(
        (item) => createData(item._id, item.name, item.comment, item.rating, <DeleteIcon className='cursor-pointer' onClick={(e) => deleteReview(e, item._id)} />),
    );
    const handleOpen = () => setOpen(true);
    React.useEffect(() => {
        DelProductReview && DelProductReview.success === true && handleOpen();
    }, [DelProductReview]);
    const hash = window.location.hash;
    return hash === '#reviewProduct' && <React.Fragment>
        <div className='w-full flex flex-col items-center justify-center bg-[white]'>
            <form onSubmit={getReviews}>
                <h1 className='w-full text-center text-xl'>Search Review</h1>
                <Input
                    placeholder="Enter Product ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <StarsOutlinedIcon />
                        </InputAdornment>
                    }
                />
                <IconButton type='submit' aria-label="Search" size="large">
                    <SavedSearchOutlinedIcon fontSize="inherit" />
                </IconButton>
            </form>
        </div>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
            <span className='text-xl text-gray'>ALL Reviews</span>
            {productReviewListLoading || DelProductReviewLoading
                ?
                <div className='w-full h-screen relative'>
                    <Loader />
                </div>
                :
                <DenseTable rows={rows} cell={cell} />}
        </div>
        {productReviewListError
            ||
            productReviewList.length < 1
            && <div className='w-full flex flex-col items-center justify-center mt-3'>
                <span className='w-full text-center'>{productReviewListError || productReviewList.length < 1 && "No Review Available Yet"}</span>
            </div>}
        {<ModalBasic open={open} setOpen={setOpen} >
            <div className='w-full flex items-center justify-center'>
                <span>{DelProductReviewError ? DelProductReviewError : DelProductReview && DelProductReview.message}</span>
            </div>
        </ModalBasic>}
    </React.Fragment>
}

export default Reviews