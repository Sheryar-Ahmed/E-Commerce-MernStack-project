import React from 'react';
import DenseTable from './Table';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createData } from './Utilis/createData';
import EditProduct from '@mui/icons-material/EditOutlined';


const Users = () => {

    const cell = ['User ID', 'Email', 'Name', 'Role', 'Actions'];
    const productActions = <div className='w-full flex flex-row gap-2 justify-end items-center'>
        <DeleteIcon />
        <EditProduct />
    </div>

    const rows = [
        createData('1212231fwf', 'Blackhat@gmail.com', 'Blackhat', 'admin', productActions),
        createData('1212231fwf', 'Blackhat@gmail.com', 'Blackhat', 'admin', productActions),
        createData('1212231fwf', 'Blackhat@gmail.com', 'Blackhat', 'admin', productActions),
        createData('1212231fwf', 'Blackhat@gmail.com', 'Blackhat', 'admin', productActions),
        createData('1212231fwf', 'Blackhat@gmail.com', 'Blackhat', 'admin', productActions),

    ];


    const hash = window.location.hash;

    return hash === '#allUsers' && <React.Fragment>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
            <span className='text-xl text-gray'>ALL Users</span>
            <DenseTable rows={rows} cell={cell} />
        </div>
    </React.Fragment>
}

export default Users;