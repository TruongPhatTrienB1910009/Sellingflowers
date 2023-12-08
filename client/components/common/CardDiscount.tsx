import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { VND } from '@/utils/VND';

export default function CardDiscount({ discount }: any) {
    console.log(discount);
    const textRef = React.useRef<any>(null);

    const copyToClipboard = () => {
        if (textRef.current) {
            textRef.current.select();
            document.execCommand('copy');
            // You can provide feedback to the user that the text has been copied
            alert(`Đã copy mã khuyến mãi ${textRef.current.value}`);
        }
    };


    return (
        <Card sx={{overflow: 'hidden' }}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    {/* Số mã đã dùng: {`${discount.applied}/${discount.total}`} */}
                    Số mã đã dùng: {`${discount.applied}/${discount.total}`}
                </Typography>
                <Typography sx={{display: 'flex', gap: '20px', alignItems: 'center'}} variant="h5" component="div">
                   <span style={{fontSize: '16px', width: '40%'}}>Mã Code:</span> <input
                        type="text"
                        defaultValue={discount.code}
                        ref={textRef}
                        readOnly
                        style={styleInput}
                    />
                </Typography>
                <Typography sx={{ margin: '10px 0px', fontSize: '20px' }} color="text.secondary">
                    Giá Trị: {VND.format(discount.amount)}
                </Typography>
                <Typography variant="body2">
                    {discount.description}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button sx={{
                    backgroundColor: '#228b22',
                    color: '#fff',
                    padding: '4px 20px',
                    ':hover': {
                        backgroundColor: '#228b22',
                        color: '#fff'
                    }
                }} size="small"
                    onClick={copyToClipboard}
                >Lấy Mã</Button>
            </CardActions> */}
        </Card>
    );
}

const styleInput = {
    border: 'none',
    fontSize: '26px',
    outline: 'none',
    width: '80%',
}   