import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SortIcon from '@mui/icons-material/Sort';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Button } from '@mui/material';

export default function Filter({ handleSortProducts, handleFilterProducts, handleGetAllProducts }: any) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleUpdateState = (state: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set("sortBy", state);
        window.history.pushState({}, '', url);
        handleSortProducts();
    }

    const getValueSelect = (e: any) => {
        const url = new URL(window.location.href);
        url.searchParams.set('order', e.target.value);
        url.searchParams.set('sortBy', 'price');
        window.history.pushState({}, '', url);
        handleGetAllProducts();
        handleSortProducts();
    }

    const handleSubmitRangePrice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        if (form.get('minPrice') && form.get('maxPrice')) {
            const max: any = form.get('maxPrice');
            const min: any = form.get('minPrice');
            const url = new URL(window.location.href);
            url.searchParams.set('maxPrice', max);
            url.searchParams.set('minPrice', min);
            window.history.pushState({}, '', url);
            handleFilterProducts();
        }
    }

    const clearState = () => {
        // Clear all query parameters
        window.history.replaceState({}, document.title, window.location.pathname);

        // Clear any hash fragment
        window.location.hash = '';

        handleGetAllProducts();
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: '0px' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton sx={{
                backgroundColor: '#228b22', color: 'white',
                ':hover': {
                    backgroundColor: '#228b22',
                    color: 'white'
                }
            }} onClick={handleClick}>
                <ListItemIcon>
                    <SortIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Sắp Xếp" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List onClick={() => handleUpdateState("sales")} component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Bán chạy nhất" />
                    </ListItemButton>
                </List>
                <List onClick={() => handleUpdateState("ctime")} component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Mới nhất" />
                    </ListItemButton>
                </List>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <select style={{
                            width: '100%',
                            fontSize: '16px',
                            padding: '4px 0px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            borderBottom: '2px solid black'
                        }} onChange={(e: any) => getValueSelect(e)} name="price" id="price">
                            <option value="asc">Giá: Từ thấp đến cao</option>
                            <option value="desc">Giá: Từ cao đến thấp</option>
                        </select>
                    </ListItemButton>
                </List>
                <List component="div" disablePadding>
                    <Box onSubmit={handleSubmitRangePrice} component={"form"} sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: '8px 16px',
                        paddingLeft: '32px',
                    }}>
                        <ListItemText sx={{ width: '100%' }} primary="Khoảng giá:" />
                        <input name='minPrice' style={{ padding: '6px', width: '100%', marginBottom: '6px' }} placeholder='Từ' type="number" />
                        <input name='maxPrice' style={{ padding: '6px', width: '100%' }} placeholder='Đến' type="number" />
                        <Button
                            sx={{
                                backgroundColor: '#228b22',
                                color: '#fff',
                                padding: '4px 10px',
                                width: '100%',
                                marginTop: '4px',
                                ':hover': {
                                    backgroundColor: '#228b22',
                                    color: '#fff',
                                }
                            }}
                            type='submit'
                        >Áp Dụng</Button>
                    </Box>
                </List>
                <List component="div" disablePadding>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center',
                        paddingBottom: '10px',
                        marginTop: '6px',
                        padding: '8px 16px',
                        paddingLeft: '32px',
                    }}>
                        <Button sx={{
                            backgroundColor: 'red',
                            color: '#fff',
                            padding: '8px 18px',
                            width: '100%',
                            ':hover': {
                                backgroundColor: 'red',
                                color: '#fff',
                            }
                        }}
                            onClick={() => clearState()}
                        >XÓA TẤT CẢ</Button>
                    </Box>
                </List>
            </Collapse>
        </List>
    );
}
