import React from 'react';
import Explain from '@mui/icons-material/ArrowOutwardOutlined';
import { createData } from './admin/Utilis/createData';
import Table from './admin/Table';

const MyOrder = () => {
  const cell = ['Order ID', 'Status', 'Items Qty', 'Amount', 'Actions'];

  const rows = [
    createData('1212231fwf', 'Delivered', '3', '44343', <Explain />),
    createData('1212231fwf', 'Delivered', '3', '44343', <Explain />),
    createData('1212231fwf', 'Delivered', '3', '44343', <Explain />),
    createData('1212231fwf', 'Delivered', '3', '44343', <Explain />),
    createData('1212231fwf', 'Delivered', '3', '44343', <Explain />),
  ];


  return (
    <div className='mt-5 w-full flex flex-col items-center justify-center gap-4'>
      <span className='w-full text-3xl text-center text-emerald-400'>My Orders</span>
      <div className='w-full shadow-lg border'>
        <Table rows={rows} cell={cell} />
      </div>
    </div>
  )
}

export default MyOrder;
