import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BackgroundHeader from '../assets/images/login.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userRegistration } from '../actions/userAction';
import Loader from './Loader';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className='shadow-lg p-3 mb-3 md:w-[400px] sm:w-[300px] lg:w-[400px] xl:w-[450px]'>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserAuth() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [avatar, setAvatar] = React.useState();

    const handleAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const userData = {
        name,
        email,
        password,
    };
    const LoginHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password))
    };
    const RegistrationHandler = async (e) => {
        e.preventDefault();
        dispatch(userRegistration(userData, avatar));
    }
    const { isAuthenticated, loading, user, error } = useSelector(state => state.user);
    let userRedirectUrl = location.search ? location.search.split("=")[1] : '/profile';
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate(userRedirectUrl);
        }
    }, [isAuthenticated]);

    return (
        <Box
            className={`w-full flex flex-col items-center justify-center aspect-square`}
            sx={{ backgroundImage: 'url(' + BackgroundHeader + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}
        >
            <Box className='shadow-lg sm:w-[300px] md:w-[450px] w-[500px] text-gray flex justify-center items-center'>
                <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { background: 'red' } }} textColor='inherit'	>
                    <Tab sx={{ color: 'white' }} label="Login" {...a11yProps(0)} />
                    <Tab sx={{ color: 'white' }} label="Register" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <section className='w-full'>
                    <div className="w-full flex flex-col items-center justify-center">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Ecommerce
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6 relative" onSubmit={LoginHandler}>
                                    {loading && <Loader />}
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            type="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            type="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <NavLink to="/forgot/password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</NavLink>
                                    </div>
                                    {error && <div className="flex items-center justify-center">
                                        <span className='text-orange'>{error}</span>
                                    </div>}
                                    <button type="submit" className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <section className='w-full'>
                    <div className="flex flex-col items-center justify-center">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Ecommerce
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                                    Create an account
                                </h1>
                                <form className="space-y-4 relative" onSubmit={RegistrationHandler}>
                                    {loading && <Loader />}
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="John Smith"
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            type="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required={true}
                                        />
                                    </div>
                                    <div className={user && user.avatar ? `w-full flex flex-row gap-2 items-center justify-start` : ''}>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {user && user.avatar && <img
                                                src={`data:image/jpeg;base64,${user.avatar.url}`}
                                                alt={user.avatar.url}
                                                className='w-[70px] h-14 aspect-square rounded-xl bg-contain'
                                            />}
                                        </label>
                                        <input
                                            type="file"
                                            accept='.png, .jpg, .jpeg'
                                            onChange={handleAvatar}
                                            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            type="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true} />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </TabPanel>
        </Box>
    );
}