import React from 'react';
import DenseTable from './Table';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createData } from './Utilis/createData';
import EditProduct from '@mui/icons-material/EditOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import ModalBasic from '../Modal';
import { getOrdersListAdmin, removeOrderAdminAction, updateOrderStatusAction } from '../../actions/orderActions';

const Orders = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [updateOrderStatus, setOrderStatus] = React.useState("");
    const [oldStatus, setOldStatus] = React.useState("");
    const [openEdit, setOpenEdit] = React.useState(false);
    const [orderId, setOrderId] = React.useState("");

    const handleOpenEdit = (id, status) => {
        setOpenEdit(true);
        setOrderId(id);
        setOldStatus(status);
    };
    const orderStatusData = {
        status: updateOrderStatus,
    };
    const updateUserOrderStatus = (e) => {
        e.preventDefault();
        dispatch(updateOrderStatusAction(orderId, orderStatusData))
    }


    //remove order
    const removeOrderHandler = (e, id) => {
        e.preventDefault();
        dispatch(removeOrderAdminAction(id));
    };

    const cell = ['Order ID', 'Status', 'Items Qty', 'Amount', 'Actions'];

    const { ordersList, ordersListLoading, ordersListError } = useSelector(state => state.ordersList)
    const rows = ordersList.map((item) => createData(item._id,
        item.orderStatus,
        item.orderItems.length,
        item.totalPrice,
        <div className='w-full flex flex-row gap-2 justify-end items-center'>
            <DeleteIcon className='cursor-pointer' onClick={(e) => removeOrderHandler(e, item._id)} />
            <EditProduct className='cursor-pointer' onClick={() => handleOpenEdit(item._id, item.orderStatus)} />
        </div>),
    );

    const { orderRem, orderRemLoading, orderRemError } = useSelector(state => state.orderRem);
    const { updatedOrderStatus, updatedOrderStatusLoading, updatedOrderStatusError } = useSelector(state => state.updatedOrderStatus);

    const handleOpen = () => setOpen(true);
    React.useEffect(() => {
        orderRem && orderRem.success === true && handleOpen();
    }, [orderRem]);
    //get updated orders list
    const getOrders = () => {
        dispatch(getOrdersListAdmin());
    };

    const hash = window.location.hash;

    return hash === '#allOrders' && <React.Fragment>
        <div className="sm:w-[300px] w-[100%] flex flex-col gap-2">
            <div className='w-full flex flex-row items-center justify-between'>
                <span className='text-xl text-gray'>ALL Products</span>
                <span onClick={() => getOrders()} className='cursor-pointer text-xl text-gray'>Refresh</span>
            </div>            
            {ordersListLoading || orderRemLoading
                ?
                <div className='w-full h-screen relative'>
                    <Loader />
                </div>
                :
                <DenseTable rows={rows} cell={cell} />}
        </div>
        <ModalBasic open={open} setOpen={setOpen} >
            <div className='w-full flex items-center justify-center'>
                <span>{orderRemError ? orderRemError : orderRem.message}</span>

            </div>
        </ModalBasic>
        {<ModalBasic open={openEdit} setOpen={setOpenEdit}>
            <form
                onSubmit={updateUserOrderStatus}
                className='w-full flex flex-col gap-2 relative'>
                {updatedOrderStatusLoading && <Loader />}
                {updatedOrderStatusError && <span className='w-full text-center text-[red]'>{updatedOrderStatusError}</span>}
                {updatedOrderStatus && <span className='w-full text-center text-emerald-400'>{updatedOrderStatus.message}</span>}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray dark:text-white">Order Status</label>
                    <input value={updateOrderStatus} onChange={(e) => setOrderStatus(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={oldStatus} required />
                </div>
                <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>
            </form>
        </ModalBasic>}
    </React.Fragment>
}

export default Orders;