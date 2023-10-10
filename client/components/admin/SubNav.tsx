import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { signIn, signOut } from '@/redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function SubNav() {
    const [selectedIndex, setSelectedIndex] = React.useState(3);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
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
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    sx={{
                        padding: '16px'
                    }}
                >
                    <ListItemIcon >
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trang Chủ" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 6}
                    onClick={(event) => handleListItemClick(event, 6)}
                    sx={{
                        padding: '16px'
                    }}
                >
                    <ListItemIcon >
                        <BookmarkBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đơn Hàng" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
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
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
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
                    selected={selectedIndex === 5}
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
