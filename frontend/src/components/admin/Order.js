import React from 'react';
import DenseTable from './Table';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createData } from './Utilis/createData';
import EditProduct from '@mui/icons-material/EditOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import ModalBasic from '../Modal';
import { removeOrderAdminAction } from '../../actions/orderActions';

const Orders = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

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
            <EditProduct />
        </div>),
    );

    const { orderRem, orderRemLoading, orderRemError } = useSelector(state => state.orderRem);
    const handleOpen = () => setOpen(true);
    React.useEffect(() => {
        orderRem && orderRem.success === true && handleOpen();
    }, [orderRem]);

    const hash = window.location.hash;

    return hash === '#allOrders' && <React.Fragment>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
            <span className='text-xl text-gray'>ALL Orders</span>
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
    </React.Fragment>
}

export default Orders;