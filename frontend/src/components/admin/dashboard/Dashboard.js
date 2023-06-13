import * as React from 'react';
import 'chart.js/auto';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dash from '@mui/icons-material/DashboardOutlined';
import Addition from '@mui/icons-material/AddBoxOutlined';
import Prof from '@mui/icons-material/Person2Outlined';
import Inven from '@mui/icons-material/Inventory2Outlined';
import Log from '@mui/icons-material/LogoutOutlined';
import Rev from '@mui/icons-material/ReviewsOutlined';
import Order from '@mui/icons-material/RedeemOutlined';
import Group from '@mui/icons-material/GroupOutlined';
import { NavLink } from 'react-router-dom';
import Admin from '../Admin';
import AddProduct from '../AddProduct';
import Reviews from '../Reviews';
import AllProducts from '../AllProducts';
import Orders from '../Order';
import Users from '../Users';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../actions/userAction';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const { logout } = useSelector(state => state.logout);
    const { user, loading } = useSelector(state => state.user);

    const logoutHandler = () => {
        dispatch(logoutUser());
    };

    if (logout && logout.success === true) {
        navigate('/login');
    };
    
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {[
                    { name: 'Dashboard', icon: <Dash />, link: '/admin/dashboard' },
                    { name: 'Account Profile', icon: <Prof />, link: '/profile' },
                    { name: 'Products', icon: <Inven />, link: '#allProducts' },
                    { name: 'Users', icon: <Group />, link: '#allUsers' },
                    { name: 'Add Product', icon: <Addition />, link: '#Newproduct' },
                    { name: 'Orders', icon: <Order />, link: '#allOrders' },
                    { name: 'Reviews', icon: <Rev />, link: '#reviewProduct' },
                ].map((items) => (
                    <ListItem key={items.name} disablePadding>
                        <NavLink to={items.link}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {items.icon}
                                </ListItemIcon>
                                <ListItemText primary={items.name} />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <div className='w-full flex items-center justify-center mt-5'>
                <Button onClick={() => logoutHandler()} variant="contained" startIcon={<Log />}>
                    Logout
                </Button>
            </div>
            <Toolbar />
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    background: 'white',
                    color: 'black'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ fontSize: '32px' }} htmlColor='#cddc39' />
                    </IconButton>
                    <Typography
                        sx={{ fontSize: '24px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        variant="h6"
                        noWrap component="div"
                    >
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
                        <section className="w-full mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                            <div className="mt-6 w-fit mx-auto">
                                <img
                                    src={`data:image/jpeg;base64,${user.avatar.url}`}
                                    className="rounded-full w-28 "
                                    alt={user && user.name}
                                />
                            </div>

                            <div className="mt-8 ">
                                <h2 className="text-white font-bold text-2xl tracking-wide">
                                    {loading ? 'loading...' : user.name.substring(0, user.name.indexOf(" "))}
                                    <br /> {user.name && user.name.substring(user.name.indexOf(" ") + 1)}
                                </h2>
                            </div>
                            <p className="text-gray text-sm mt-2.5" >
                                {loading ? 'loading...' : user.email}
                            </p>
                            <p className="text-emerald-400 font-semibold mt-2.5" >
                                {user && 'Active'}
                            </p>
                        </section>

                    </section>
                    {drawer}
                </Drawer>
            </Box>


            {/* main box */}
            <Box
                component="main"
                sx={{ background: '#eceff1', flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {<Admin />}
                {<AddProduct />}
                {<Reviews />}
                {<AllProducts />}
                {<Orders />}
                {<Users />}
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;