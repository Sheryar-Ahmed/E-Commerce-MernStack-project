import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DashboardIcon from '@mui/icons-material/GridViewOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/userAction';

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const LogoutUser = () => {
    dispatch(logoutUser());
    window.location.reload(false);
  };
  const actions = [
    { icon: <NavLink to='/'> <AddHomeOutlinedIcon /></NavLink>, name: 'Home' },
    { icon: <NavLink to='/cart'><ShoppingCartOutlinedIcon /></NavLink>, name: `cart(${cartItems && cartItems.length})` },
    { icon: <NavLink to='/products'><CategoryOutlinedIcon /></NavLink >, name: 'products' },
    {
      icon: isAuthenticated ? <LogoutOutlinedIcon onClick={() => LogoutUser()} />
        :
        <NavLink to='/login'><LoginOutlinedIcon /></NavLink >, name: isAuthenticated ? 'Logout' : 'Login'
    },
  ];
  isAuthenticated && actions.push({ icon: <NavLink to='/profile'><Person3OutlinedIcon /></NavLink >, name: 'Profile' },);
  isAuthenticated && user.role === 'admin' && actions.push({ icon: <NavLink to='/admin/dashboard'><DashboardIcon /></NavLink >, name: 'Dashboard' },)
  return (
    <SpeedDial
      ariaLabel="SpeedDial openIcon example"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={
        user && user.avatar && user.avatar.url ? <img className='w-10 h-10 rounded-[50%]' src={`data:image/jpeg;base64,${user.avatar.url}`} alt={user.name} /> : <SpeedDialIcon openIcon={<EditIcon />} />}
    >
      {
        actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))
      }
    </ SpeedDial >
  );
}
























// import React, { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userDetails } from '../../actions/userAction';
// const Header = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {

//     dispatch(userDetails());

//   }, [dispatch]);

//   const { loading, error, user } = useSelector(state => state.user);

//   return (
//     <NavLink
//       to="/"
//       className={({ isActive }) =>
//         isActive ? 'text-blue flex items-center flex-col' : 'flex items-center flex-col'
//       }
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
//       </svg>
//       <span className='text-inherit'>Home</span>
//     </NavLink>

//   )
// }

// export default Header;