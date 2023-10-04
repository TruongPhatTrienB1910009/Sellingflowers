import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "@/styles/common/card.css";
import { IconButton } from '@mui/material';
import { addItemToCart } from '@/services/cartService';
import CustomizedSnackbars from './Snackbar';
import { useRef, useState } from 'react';


interface CardProps {
    item: any;
}

const MediaCard: React.FC<CardProps> = ({ item }) => {
    const childRef = useRef<any>(null);

    const handleAddItemToCart = async (e: any) => {
        try {
            e.preventDefault();
            console.log(item.id)
            const data = await addItemToCart({
                "ProductId": item.id,
                "totalItems": 1,
            })

            if (data.EC == 0) {
                childRef.current!.handleOpen();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <CustomizedSnackbars ref={childRef} />
            <Card sx={{ maxWidth: "100%" }}>
                <CardMedia
                    component="img"
                    sx={{ maxHeight: "auto" }}
                    image={item?.img.slice(item?.img.indexOf('images'))}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item?.description.slice(0, 100) + '...'}
                    </Typography>
                </CardContent>
                <CardActions className='cardAts'>
                    <div>
                        <Button size="small">Giá {item?.price}</Button>
                        <Button size="small">Còn {item?.inventory} SP</Button>
                    </div>
                    <IconButton onClick={handleAddItemToCart} sx={{ color: "#228b22" }} aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
}

export default MediaCard;