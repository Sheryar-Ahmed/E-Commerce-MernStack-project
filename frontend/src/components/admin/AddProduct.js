import * as React from "react";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { createProductAdminAction } from '../../actions/productAction';
import ModalBasic from '../Modal';
import Loader from '../Loader';

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

const AddProduct = () => {
    const dispatch = useDispatch();
    const [personName, setPersonName] = React.useState([]);
    const [selectImage, setSelectImage] = React.useState([]);
    const [name, setProductName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [stock, setStock] = React.useState(0);
    const [open, setOpen] = React.useState(false);

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
        console.log(selectedImagesUrl);
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


    //product Creation 
    const ProductCreation = (e) => {
        e.preventDefault();
        dispatch(createProductAdminAction(newProductdata));
    };


    const { createProduct, createProductLoading, createProductError } = useSelector(state => state.createProduct);

    const handleOpen = () => setOpen(true);
    React.useEffect(() => {
        createProduct && createProduct.success === true && handleOpen();
    }, [createProduct]);

    const hash = window.location.hash;


    return hash === '#Newproduct'
        &&
        <div className="flex flex-col items-center justify-center">
            <Typography sx={{ fontSize: '24px' }} component="h2">Add New Product</Typography>
            <form
                onSubmit={ProductCreation}
                className="w-full flex items-center justify-center relative"
            >
                {createProductLoading && <Loader />}
                <div className="md:w-full sm:w-full w-1/2 bg-[white] shadow-lg flex flex-col gap-4 items-center py-8 px-3 rounded-lg">
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
                            Create Product
                        </Button>
                    </div>
                </div>
            </form>
            {<ModalBasic open={open} setOpen={setOpen} >
                <div className='w-full flex items-center justify-center'>
                    <span>{createProductError ? createProductError : createProduct && createProduct.message}</span>
                </div>
            </ModalBasic>}
        </div>
};
export default AddProduct;