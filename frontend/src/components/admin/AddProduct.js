import * as React from "react";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography } from "@mui/material";

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

    const [personName, setPersonName] = React.useState([]);
    const [selectImage, setSelectImage] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    //images upload
    const fileSelection = (event) => {
        const onSelectedFiles = event.target.files;
        const selectedFilesArray = Array.from(onSelectedFiles);
        //get url 
        const selectedImagesUrl = selectedFilesArray.map((phot) => URL.createObjectURL(phot));
        setSelectImage((prev) => prev.concat(selectedImagesUrl));
    };
    //product Creation 
    const ProductCreation = (e) => {
        e.preventDefault();
    };
    const hash = window.location.hash;


    return hash === '#Newproduct'
        &&
        <div className="flex flex-col items-center justify-center">
            <Typography sx={{ fontSize: '24px' }} component="h2">Add New Product</Typography>
            <form
                onSubmit={ProductCreation}
                className="w-full flex items-center justify-center"
            >
                <div className="md:w-full sm:w-full w-1/2 bg-[white] shadow-lg flex flex-col gap-4 items-center py-8 px-3 rounded-lg">
                    <TextField fullWidth label="Product Name" />
                    <TextField
                    fullWidth
                        label="Product Description"
                        multiline
                        minRows={4}
                    />
                    <TextField fullWidth label="Product Price" type="number" />
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-multiple-name-label">Product Category</InputLabel>
                        <Select
                            sx={{ width: '100%' }}
                            labelId="demo-multiple-name-label"
                            multiple
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
                                    src={item}
                                    alt={item}
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
                    <TextField fullWidth label="Product Stock" type="number" />
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
        </div>
};
export default AddProduct;