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
import { useRouter } from 'next/navigation';
import { VND } from '@/utils/VND';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { handleGetItemsInCart } from '@/redux/features/cart-slice';


interface CardProps {
    item?: any;
}

const MediaCard: React.FC<CardProps> = ({ item }) => {
    const childRef = useRef<any>(null);
    const [message, setMessage] = useState<any>("");
    const [stateMessage, setStateMessage] = useState<any>("success");
    const dispatch = useDispatch<AppDispatch>();

    const handleAddItemToCart = async (e: any) => {
        try {
            e.preventDefault();
            const data = await addItemToCart({
                "ProductId": item.id,
                "totalItems": 1,
            })

            if (data.EC == 0) {
                setMessage("Thêm sản phẩm thành công");
                childRef.current!.handleOpen();
                dispatch(handleGetItemsInCart());
            } else {
                setStateMessage("error")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Link href={`/products/${item.id}`}>
                <CustomizedSnackbars ref={childRef} message={message} stateMessage={stateMessage} />
                <Card sx={{ maxWidth: "100%", border: '1px solid #ccc'}}>
                    <CardMedia
                        component="img"
                        sx={{ maxHeight: "auto" }}
                        image={`/${item?.img.slice(item?.img.indexOf('images'))}`}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom component="div" sx={{
                            color: "#228b22",
                            fontSize: '16px',
                            marginBottom: '10px'
                        }}>
                            {item?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item?.description.slice(0, 100) + '...'}
                        </Typography>
                    </CardContent>
                    <CardActions className='cardAts'>
                        <div>
                            <Button size="small">Giá {VND.format(item?.price)}</Button>
                            <Button size="small">(Còn {item?.inventory} SP)</Button>
                        </div>
                        <IconButton onClick={handleAddItemToCart} sx={{ color: "#228b22" }} aria-label="add to shopping cart">
                            <AddShoppingCartIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </Link>
        </>
    );
}

export default MediaCard;