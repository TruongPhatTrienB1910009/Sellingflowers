'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import Image from 'next/image';
// css
import '@/styles/navStyle.css';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Thông Báo', 'Đăng Nhập', 'Đăng ký'];

export default function DrawerAppBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List sx={{ padding: 0 }}>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box>
                <AppBar component="nav" className='navBar'>
                    <Toolbar className='toolBar'>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="div"
                            sx={{ flexGrow: 1 }}
                            className='Typography'
                        >
                            <Image
                                src="/images/logo.jpg"
                                width={46}
                                height={46}
                                alt="Logo"
                                className='logo'
                            />

                            Green.

                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Tìm kiếm…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Typography>

                        <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
                            <ul className='navItemsLink'>
                                <li className='navLink'>
                                    <Link href="/">
                                        <Button sx={{ color: '#fff' }}>
                                            Thông báo
                                        </Button>
                                    </Link>
                                </li>
                                <li className='navLink'>
                                    <Link href="/signin">
                                        <Button sx={{ color: '#fff' }}>
                                            Đăng nhập
                                        </Button>
                                    </Link>
                                </li>
                                <li className='navLink'>
                                    <Link href="/signup">
                                        <Button sx={{ color: '#fff' }}>
                                            Đăng ký
                                        </Button>
                                    </Link>
                                </li>
                            </ul>
                        </Box>
                    </Toolbar>
                    <Toolbar className='toolBar_2'>
                        <ul className='navItemsLink'>
                            <li className='navSubLink'>
                                <Link href="/">
                                    <Button sx={{ color: '#fff' }}>
                                        Tất cả
                                    </Button>
                                </Link>
                            </li>
                            <li className='navSubLink'>
                                <Link href="/about">
                                    <Button sx={{ color: '#fff' }}>
                                        Cây cảnh
                                    </Button>
                                </Link>
                            </li>
                            <li className='navSubLink'>
                                <Link href="/blog/hello-world">
                                    <Button sx={{ color: '#fff' }}>
                                        Hoa tươi
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </>
    );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '60ch',
        },
    },
}));