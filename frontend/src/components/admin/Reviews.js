import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton'
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DenseTable from './Table';
import { createData } from './Utilis/createData';
const Reviews = () => {
    const getReviews = (e) => {
        e.preventDefault();
    }


    const cell = ['Review ID', 'User', 'Comment', 'Rating', 'Actions'];

    const rows = [
        createData('1212231fwf', 'royalblackhat', "This product is awesome", 5, <DeleteIcon />),
        createData('1212231fwf', 'royalblackhat', "This product is awesome", 5, <DeleteIcon />),
        createData('1212231fwf', 'royalblackhat', "This product is awesome", 5, <DeleteIcon />),
        createData('1212231fwf', 'royalblackhat', "This product is awesome", 5, <DeleteIcon />),
        createData('1212231fwf', 'royalblackhat', "This product is awesome", 5, <DeleteIcon />),
    ];

    const hash = window.location.hash;
    return hash === '#reviewProduct' && <React.Fragment>
        <div className='w-full flex flex-col items-center justify-center bg-[white]'>
            <form onSubmit={getReviews}>
                <h1 className='w-full text-center text-xl'>Search Review</h1>
                <Input
                    placeholder="Enter Product ID"
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
        <div className='sm:w-[280px] w-full flex flex-col gap-2 mt-2'>
            <span className='text-xl text-gray ml-2'>ALL Reviews</span>
            <DenseTable rows={rows} cell={cell} />
        </div>
    </React.Fragment>
}

export default Reviews