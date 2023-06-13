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
    const fileSelection = (event) => {
        const onSelectedFiles = event.target.files;
        const selectedFilesArray = Array.from(onSelectedFiles);
        //get url 
        const selectedImagesUrl = selectedFilesArray.map((phot, i) => {
            return {
                public_id: i,
                url: URL.createObjectURL(phot)
            }
        });
        setSelectImage((prev) => prev.concat(selectedImagesUrl));
    };
    const newProductdata = {
        name,
        description,
        price,
        category: personName,
        images: selectImage,
        stock,
    }

    //remove product
    const removeProductHandler = (e, id) => {
        e.preventDefault();
        dispatch(removeProductAdminAction(id));
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
    const getProducts = () => {
        dispatch(getProductsListAdmin());
    };
    const hash = window.location.hash;

    return hash === '#allProducts' && <React.Fragment>
        <div className='sm:w-[280px] w-[100%] flex flex-col gap-2'>
            <div className='w-full flex flex-row items-center justify-between'>
                <span className='text-xl text-gray'>ALL Products</span>
                <span onClick={() => getProducts()} className='text-xl text-gray cursor-pointer'>Refresh</span>
            </div>
            {productsListLoading
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
                            <div className="flex flex-col items-center justiy-start gap-0" key={item}>
                                <img
                                    className="w-20 h-20"
                                    src={item.url}
                                    alt={item.public_id}
                                    loading="lazy"
                                />
                                <IconButton
                                    onClick={() => setSelectImage(selectImage.filter((e) => e !== item))}
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
    </React.Fragment>
}

export default AllProducts;