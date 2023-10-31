import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb({slide} : {slide: string}) {
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link sx={{display: 'flex', fontSize: '16px', fontWeight: '600'}} underline="hover" color="inherit" href="/">
                    <HomeIcon sx={{marginRight: '6px'}}/> Trang Chủ
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/products"
                    sx={{display: 'flex', fontSize: '16px', fontWeight: '600'}}
                >
                    Sản Phẩm
                </Link>
                <Typography sx={{display: 'flex', fontSize: '16px', fontWeight: '600'}} color="text.primary"> {slide}</Typography>
            </Breadcrumbs>
        </div>
    );
}
