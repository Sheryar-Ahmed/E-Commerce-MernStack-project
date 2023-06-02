import React from 'react';
import DenseTable from './Table';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createData } from './Utilis/createData';
import EditProduct from '@mui/icons-material/EditOutlined';


const AllProducts = () => {

    const cell = ['Product ID', 'Name', 'Stock', 'Price', 'Actions'];
    const productActions = <div className='w-full flex flex-row gap-2 justify-end items-center'>
        <DeleteIcon />
        <EditProduct />
    </div>

    const rows = [
        createData('1212231fwf', 'royalblackhat', 4, 5, productActions),
        createData('1212231fwf', 'royalblackhat', 5, 5, productActions),
        createData('1212231fwf', 'royalblackhat', 5, 5, productActions),
        createData('1212231fwf', 'royalblackhat', 5, 5, productActions),
        createData('1212231fwf', 'royalblackhat', 5, 5, productActions),
    ];


    const hash = window.location.hash;

    return hash === '#allProducts' && <React.Fragment>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
            <span className='text-xl text-gray'>ALL Products</span>
            <DenseTable rows={rows} cell={cell} />
        </div>
    </React.Fragment>
}

export default AllProducts;