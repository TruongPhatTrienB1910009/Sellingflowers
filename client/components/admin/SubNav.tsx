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
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';

export default function SubNav() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const dispatch = useDispatch();
    const router = useRouter();
    const [open, setOpen] = React.useState(true);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };


    const handleClick = () => {
        setOpen(!open);
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
                <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)} sx={{
                    padding: '16px'
                }}>
                    <ListItemIcon>
                        <BookmarkBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Hóa Đơn" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, paddingY: '12px' }}>
                            <ListItemIcon>
                                <DoubleArrowOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tất cả" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, paddingY: '12px' }}>
                            <ListItemIcon>
                                <DoubleArrowOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chờ xác nhận" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => {
                        handleListItemClick(event, 2)
                        router.push("/dashboard/products")
                    }}
                    sx={{
                        padding: '16px'
                    }}
                >
                    <ListItemIcon >
                        <ProductionQuantityLimitsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sản Phẩm" />
                </ListItemButton>
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
