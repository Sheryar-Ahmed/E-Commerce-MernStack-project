import React from 'react';
import DenseTable from './Table';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createData } from './Utilis/createData';
import EditProduct from '@mui/icons-material/EditOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import ModalBasic from '../Modal';
import { removeUserAdminAction } from '../../actions/userAction';


const Users = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    //remove product
    const removeUserHandler = (e, id) => {
        e.preventDefault();
        dispatch(removeUserAdminAction(id));
    };
    const cell = ['User ID', 'Email', 'Name', 'Role', 'Actions'];

    const { usersList, usersListLoading, usersListError } = useSelector(state => state.usersList);
    
    const rows = usersList.map((item) => createData(item._id,
        item.email,
        item.name,
        item.role,
        <div className='w-full flex flex-row gap-2 justify-end items-center'>
            <DeleteIcon className='cursor-pointer' onClick={(e) => removeUserHandler(e, item._id)} />
            <EditProduct />
        </div>),
    );

    const { userRem, userRemLoading, userRemError } = useSelector(state => state.userRem);
    const handleOpen = () => setOpen(true);
    React.useEffect(() => {
        userRem && userRem.success === true && handleOpen();
    }, [userRem]);

    const hash = window.location.hash;

    return hash === '#allUsers' && <React.Fragment>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
            <span className='text-xl text-gray'>ALL Users</span>
            {usersListLoading || userRemLoading
                ?
                <div className='w-full h-screen relative'>
                    <Loader />
                </div>
                :
                <DenseTable rows={rows} cell={cell} />}
        </div>
        <ModalBasic open={open} setOpen={setOpen} >
            <div className='w-full flex items-center justify-center'>
                <span>{userRemError ? userRemError : userRem.message}</span>

            </div>
        </ModalBasic>
    </React.Fragment>
}

export default Users;