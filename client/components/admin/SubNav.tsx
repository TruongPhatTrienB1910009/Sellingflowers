import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { Collapse, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { signIn, signOut } from '@/redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import InventoryIcon from '@mui/icons-material/Inventory';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CategoryIcon from '@mui/icons-material/Category';

export default function SubNav() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const dispatch = useDispatch();
    const router = useRouter();
    const [openBill, setOpenBill] = React.useState(true);
    const [openProducts, setOpenProducts] = React.useState(true);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };


    const handleClick = () => {
        setOpenBill(!open);
    };

    const handleSignOut = () => {
        dispatch(signOut());
        localStorage.removeItem("accesstoken");
        router.push("/signin");
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 320, minHeight: '100vh', bgcolor: 'background.paper' }}>
            <Box>
                <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '40px', fontFamily: 'monospace', fontWeight: '600' }}>
                    <Image
                        src="/images/logo.jpg"
                        width={140}
                        height={140}
                        alt="Logo"
                        style={{
                            borderRadius: '60%',
                            marginRight: '8px'
                        }}
                    />

                    Green.
                </Typography>
            </Box>
            <Divider />
            <List sx={{ paddingY: 0 }} component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    sx={{
                        padding: '16px'
                    }}
                >
                    <ListItemIcon >
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trang Chủ" />
                </ListItemButton>
                <ListItemButton onClick={() => {setOpenBill(!openBill)}} sx={{
                    padding: '16px'
                }}>
                    <ListItemIcon>
                        <BookmarkBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Hóa Đơn" />
                    {openBill ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openBill} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton selected={selectedIndex === 1} 
                                onClick={(event) => {
                                    handleListItemClick(event, 1) 
                                    router.push("/dashboard/receipts/list")
                                }} 
                                sx={{ pl: 4, paddingY: '12px' }}>
                            <ListItemIcon>
                                <ReceiptLongIcon />
                            </ListItemIcon>
                            <ListItemText primary="Danh sách hóa đơn" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, paddingY: '12px' }}>
                            <ListItemIcon>
                                <HourglassEmptyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chờ xác nhận" />
                        </ListItemButton>
                    </List>
                </Collapse>


                <ListItemButton
                    onClick={() => {setOpenProducts(!openProducts)}}
                    sx={{
                        padding: '16px'
                    }}
                >
                    <ListItemIcon >
                        <ProductionQuantityLimitsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sản Phẩm" />
                    {openProducts ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openProducts} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => {
                                handleListItemClick(event, 2)
                                router.push("/dashboard/products/list")
                            }}
                            sx={{ pl: 4, paddingY: '12px' }}>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Danh sách sản phẩm" />
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 5} onClick={(event) => {
                            handleListItemClick(event, 5) 
                            router.push("/dashboard/products/importbill")
                        }} sx={{ pl: 4, paddingY: '12px' }}>
                            <ListItemIcon>
                                <AppRegistrationIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tạo phiếu nhập" />
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 6} onClick={(event) => {
                            handleListItemClick(event, 6) 
                            router.push("/dashboard/products/supplier")
                        }} sx={{ pl: 4, paddingY: '12px' }}>
                            <ListItemIcon>
                                <AllInboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nhà cung cấp" />
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 7} onClick={(event) => {
                            handleListItemClick(event, 7) 
                            router.push("/dashboard/products/categories")
                        }} sx={{ pl: 4, paddingY: '12px' }}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Danh mục và Loại" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                    sx={{
                        padding: '16px'
                    }}
                >
                    <ListItemIcon >
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Khách Hàng" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={handleSignOut}
                    sx={{
                        padding: '16px'
                    }}
                >
                    <ListItemIcon >
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đăng Xuất" />
                </ListItemButton>
            </List>
        </Box>
    );
}
