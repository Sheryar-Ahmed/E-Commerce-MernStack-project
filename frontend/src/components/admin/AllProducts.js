import React, { useEffect } from 'react';
import DenseTable from './Table';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createData } from './Utilis/createData';
import EditProduct from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { getProductsListAdmin, removeProductAdminAction, updateProductAdminAction } from '../../actions/productAction';
import ModalBasic from '../Modal';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from "@mui/material";
import HelmetProvider from './../SEO/Helmet';
import Alert from '../Alert';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Mobile',
    'Laptop',
    'Electronics',
    'Clothes',
    'Headphones',
    'Cargo',
    'Apartment',
    'Cars',
    'Bikes',
];


const AllProducts = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [productId, setProductId] = React.useState("");
    const [personName, setPersonName] = React.useState([]);
    const [selectImage, setSelectImage] = React.useState([]);
    const [name, setProductName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [stock, setStock] = React.useState(0);
    const [delImages, setDelImages] = React.useState([]);
    const [delImagesUrl, setDelImagesUrl] = React.useState([]);
    const [openSnack, setOpenSnack] = React.useState(false);


    const handleOpenEdit = (id, name, description, price, category, images, stock) => {
        setOpenEdit(true);
        setProductId(id);
        setProductName(name);
        setDescription(description);
        setPrice(price);
        setPersonName(category);
        setSelectImage(images);
        setStock(stock);
    };

    const handleChange = (event) => {
        setPersonName(event.target.value)
    };
    //images upload
    const fileSelection = (e) => {
        const files = Array.from(e.target.files);

        setSelectImage([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setSelectImage((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    const newProductdata = {
        name,
        description,
        price,
        category: personName,
        images: selectImage,
        delImages,
        delImagesUrl,
        stock,
    }

    //remove product
    const removeProductHandler = (e, id) => {
        e.preventDefault();
        dispatch(removeProductAdminAction(id));
    };
    const deleteImagesHandler = (e, item, itemPublicId, itemUrl) => {
        setDelImages((old) => [...old, itemPublicId]);
        setDelImagesUrl((old) => [...old, itemUrl]);
        setSelectImage(selectImage.filter((e) => e !== item));
    };
    //update Product 
    const updateProductHandler = (e) => {
        e.preventDefault();
        dispatch(updateProductAdminAction(productId, newProductdata));
    };

    const cell = ['Product ID', 'Name', 'Stock', 'Price', 'Actions'];
    const { productsList, productsListLoading, productsListError } = useSelector(state => state.productsList);
    const rows = productsList.map((item) => createData(item._id,
        item.name,
        item.stock,
        item.price,
        <div className='w-full flex flex-row gap-2 justify-end items-center'>
            <DeleteIcon className='cursor-pointer' onClick={(e) => removeProductHandler(e, item._id)} />
            <EditProduct className='cursor-pointer' onClick={() => handleOpenEdit(item._id, item.name, item.description, item.price, item.category, item.images, item.stock)} />
        </div>),);

    const { productRem, productRemLoading, productRemError } = useSelector(state => state.productRem);
    const { updateProduct, updateProductLoading, updateProductError } = useSelector(state => state.updateProduct);

    const handleOpen = () => setOpen(true);
    useEffect(() => {
        (productRem || updateProduct) && (productRem.success === true || updateProduct.success === true) && handleOpen();
    }, [productRem, updateProduct]);
    const snakcBarOpen = () => setOpenSnack(true);
    useEffect(() => {
        (!productsListLoading && productsListError) && snakcBarOpen();
    }, [productsListError]);


    const getProducts = () => {
        dispatch(getProductsListAdmin());
    };
    const hash = window.location.hash;

    return hash === '#allProducts' && <React.Fragment>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
            <HelmetProvider
                title={`Dashboard (All Products(${productsList && productsList.length}))`}
            />
            <div className='w-full flex flex-row items-center justify-between'>
                <span className='text-xl text-gray'>ALL Products</span>
                <span onClick={() => getProducts()} className='text-xl text-gray cursor-pointer'>Refresh</span>
            </div>
            {(productsListLoading || productRemLoading)
                ?
                <div className='w-full h-screen relative'>
                    <Loader />
                </div>
                :
                <DenseTable rows={rows} cell={cell} />}
        </div>
        < ModalBasic open={open} setOpen={setOpen} >
            <div className='w-full flex items-center justify-center'>
                <span>{(productRemError || updateProductError) ? (productRemError || updateProductError) : (productRem.message || updateProduct.message)}</span>

            </div>
        </ModalBasic>
        {<ModalBasic open={openEdit} setOpen={setOpenEdit}>
            <form
                onSubmit={updateProductHandler}
                className="sm:w-11/12 w-full flex items-center justify-center relative rounded-lg overflow-y-scroll h-[80vh]"
            >
                {updateProductLoading && <Loader />}
                <div className="sm:w-11/12 sm:px-0 w-full bg-[white] shadow-lg flex flex-col gap-4 items-center py-8 px-3 rounded-lg h-[80vh]">
                    <TextField
                        value={name}
                        onChange={(e) => setProductName(e.target.value)}
                        fullWidth
                        label="Product Name" />
                    <TextField
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        label="Product Description"
                        multiline
                        minRows={4}
                    />
                    <TextField
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        label="Product Price"
                        type="number" />
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-multiple-name-label">Product Category</InputLabel>
                        <Select
                            sx={{ width: '100%' }}
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Product Category" />}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <span className={selectImage.length > 9 ? 'w-full text-[red] text-xl text-center' : 'w-full ml-3'}>
                        {selectImage.length > 9 ? 'You can only Upload 8 Images' : 'Upload Product Images'}
                    </span>
                    <div className="w-full flex flex-row justify-center items-center">
                        <input
                            className="w-full"
                            type="file"
                            multiple
                            onChange={fileSelection}
                            accept="image/png, image/jpg, image/jpeg"
                        />
                    </div>
                    <div className="w-full gap-2 flex flex-row flex-wrap items-center justify-start">
                        {selectImage.length < 9 && selectImage.map((item) => (
                            <div className="flex flex-col items-center justiy-start gap-0" key={item.public_id}>
                                <img
                                    className="w-20 h-20"
                                    src={item.url || item}
                                    alt={item.public_id}
                                    loading="lazy"
                                />
                                <IconButton
                                    onClick={(e) => deleteImagesHandler(e, item, item.public_id, item.url)}
                                    aria-label="delete"
                                    color="primary">
                                    <DeleteIcon
                                    />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                    <TextField
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        fullWidth
                        label="Product Stock"
                        type="number" />
                    <div className="sm:w-full w-64 flex items-center justify-center">
                        <Button
                            type='submit'
                            sx={{ width: '100%', }}
                            variant="contained" startIcon={<AddShoppingCartIcon />}>
                            Update Product
                        </Button>
                    </div>
                </div>
            </form>
        </ModalBasic>}
        {<Alert
            openSnack={openSnack}
            setOpenSnack={setOpenSnack}
            message={productsListError}
            severity="error"
        />
        }
    </React.Fragment>
}

export default AllProducts;