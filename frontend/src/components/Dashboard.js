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
import Deleteion from '@mui/icons-material/DeleteOutlined';
import Log from '@mui/icons-material/LogoutOutlined';
import Rev from '@mui/icons-material/ReviewsOutlined';
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";


const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    //chart data for products
    const chartData = {
        labels: ['In Stock', 'Out Stock'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Product',
                data: [55, 23],
                // you can set indiviual colors for each bar
                backgroundColor: [
                    '#9c27b0',
                    '#3f51b5',
                ],
                borderWidth: 1,
            }
        ]
    }

    const data = {
        labels: ['Intial Amount', 'Amount Earned'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Earning',
                data: [0, 155000],
                // you can set indiviual colors for each bar
                backgroundColor: [
                    '#9c27b0',
                    '#3f51b5',
                ],
                borderWidth: 1,
            }
        ]
    }
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {[
                    { name: 'Dashboard', icon: <Dash /> },
                    { name: 'Account Profile', icon: <Prof /> },
                    { name: 'Add Product', icon: <Addition /> },
                    { name: 'Delete Product', icon: <Deleteion /> },
                    { name: 'Reviews', icon: <Rev /> },
                ].map((items) => (
                    <ListItem key={items.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {items.icon}
                            </ListItemIcon>
                            <ListItemText primary={items.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <div className='w-full flex items-center justify-center mt-5'>
                <Button variant="contained" startIcon={<Log />}>
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
                    <section class=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
                        <section class="w-full mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                            <div class="mt-6 w-fit mx-auto">
                                <img src="https://images.unsplash.com/photo-1623230590824-f39e31a0a608?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwYm95fGVufDB8fDB8fHww&w=1000&q=80" class="rounded-full w-28 " alt="profile picture" srcset="" />
                            </div>

                            <div class="mt-8 ">
                                <h2 class="text-white font-bold text-2xl tracking-wide">Jonathan <br /> Smith</h2>
                            </div>
                            <p class="text-gray text-sm mt-2.5" >
                                royalsherya505@gmail.com
                            </p>
                            <p class="text-emerald-400 font-semibold mt-2.5" >
                                Active
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
                <div className='bg-[white] w-full flex flex-row gap-2 items-center justify-center shadow-[box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px ] py-2 flex-wrap'>
                    <button
                        class="sm:w-[240px] sm:h-[240px] w-72 h-72 rounded-full bg-[#3f51b5] hover:bg-[#9c27b0] text-white">
                        Product <br />
                        <span className='text-lg'>19</span>
                    </button>
                    <button
                        class="sm:w-[240px] sm:h-[240px] w-72 h-72 rounded-full bg-gray hover:bg-[lightgreen] text-white">
                        Orders <br />
                        <span className='text-lg'>2</span>
                    </button>
                    <button
                        class="sm:w-[240px] sm:h-[240px] w-72 h-72 rounded-full bg-[#9c27b0] hover:bg-[#3f51b5] text-white">
                        Users <br />
                        <span className='text-lg'>3</span>
                    </button>
                </div>
                <div className='w-full bg-[white] my-2 flex flex-row gap-2 items-center justify-center shadow-[box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px ] py-2 flex-wrap'>
                    <div class="sm:w-[280px] sm:h-[280px] w-full h-[400px] flex items-center justify-center bg-[white] text-white">
                        <Line
                            data={data}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Total Amount"
                                    },
                                    legend: {
                                        display: true
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className='w-full bg-[white] flex flex-row gap-2 items-center justify-center shadow-[box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px ] py-2 flex-wrap'>
                    <div class="sm:w-[280px] sm:h-[280px] w-[400px]  h-[400px] flex items-center justify-center bg-[white] text-white">
                        <Pie
                            data={chartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Availability of Products"
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;