import React from 'react';
import DenseTable from './Table';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createData } from './Utilis/createData';
import EditProduct from '@mui/icons-material/EditOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import ModalBasic from '../Modal';
import { getUsersListAdmin, removeUserAdminAction, updateUserRoleAdminAction } from '../../actions/userAction';


const Users = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [role, setRole] = React.useState("");

    const handleOpenEdit = (name, email, id) => {
        setOpenEdit(true);
        setEmail(email);
        setFullName(name);
        setUserId(id);
    };
    const userRoleData = {
        role,
    };
    const updateUserRole = (e) => {
        e.preventDefault();
        dispatch(updateUserRoleAdminAction(userId, userRoleData))
    }
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
            <EditProduct className='cursor-pointer' onClick={() => handleOpenEdit(item.name, item.email, item._id)} />
        </div>),
    );

    const { userRem, userRemLoading, userRemError } = useSelector(state => state.userRem);
    const { userRole, userRoleLoading, userRoleError } = useSelector(state => state.userRole);

    const handleOpen = () => setOpen(true);
    React.useEffect(() => {
        userRem && userRem.success === true && handleOpen();
    }, [userRem]);
    //get UpdatedUsers List
    const getUsers = () => {
        dispatch(getUsersListAdmin());
    };
    const hash = window.location.hash;

    return hash === '#allUsers' && <React.Fragment>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
        <div className='w-full flex flex-row items-center justify-between'>
                <span className='text-xl text-gray'>ALL Products</span>
                <span onClick={() => getUsers()} className='text-xl text-gray cursor-pointer'>Refresh</span>
            </div>            {usersListLoading || userRemLoading
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
        {<ModalBasic open={openEdit} setOpen={setOpenEdit}>
            <form
                onSubmit={updateUserRole}
                className='w-full flex flex-col gap-2 relative'>
                {userRoleLoading && <Loader />}
                {userRoleError && <span className='w-full text-center text-[red]'>{userRoleError}</span>}
                {userRole && <span className='w-full text-center text-emerald-400'>{userRole.message}</span>}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray dark:text-white">Full Name</label>
                    <input value={fullName} readOnly type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={fullName} required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray dark:text-white">Email</label>
                    <input value={email} readOnly type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={email} required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray dark:text-white">Role</label>
                    <input value={role} onChange={(e) => setRole(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>
            </form>
        </ModalBasic>}
    </React.Fragment>
}

export default Users;