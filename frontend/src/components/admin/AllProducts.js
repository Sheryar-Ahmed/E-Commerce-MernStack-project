import React, { useEffect } from 'react';
import DenseTable from './Table';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createData } from './Utilis/createData';
import EditProduct from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { removeProductAdminAction } from '../../actions/productAction';
import ModalBasic from '../Modal';

const AllProducts = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    //remove product
    const removeProductHandler = (e, id) => {
        e.preventDefault();
        dispatch(removeProductAdminAction(id))
    };
    const cell = ['Product ID', 'Name', 'Stock', 'Price', 'Actions'];
    const { productsList, productsListLoading, productsListError } = useSelector(state => state.productsList);
    const rows = productsList.map((item) => createData(item._id,
        item.name,
        item.stock,
        item.price,
        <div className='w-full flex flex-row gap-2 justify-end items-center'>
            <DeleteIcon className='cursor-pointer' onClick={(e) => removeProductHandler(e, item._id)} />
            <EditProduct />
        </div>),);

    const { productRem, productRemLoading, productRemError } = useSelector(state => state.productRem);
    const handleOpen = () => setOpen(true);
    useEffect(() => {
        productRem && productRem.success === true && handleOpen();
    }, [productRem]);
    const hash = window.location.hash;

    return hash === '#allProducts' && <React.Fragment>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
            <span className='text-xl text-gray'>ALL Products</span>
            {productsListLoading
                ?
                <div className='w-full h-screen relative'>
                    <Loader />
                </div>
                :
                <DenseTable rows={rows} cell={cell} />}
        </div>
        < ModalBasic open={open} setOpen={setOpen} >
            <div className='w-full flex items-center justify-center'>
                <span>{productRemError ? productRemError : productRem.message}</span>

            </div>
        </ModalBasic >
    </React.Fragment>
}

export default AllProducts;