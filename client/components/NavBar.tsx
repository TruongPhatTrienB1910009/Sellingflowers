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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Link from 'next/link';
import Image from 'next/image';
import NestedListItems from './NestedListItems';

// css
import '@/styles/navStyle.css';
import { useAppSelector } from '@/redux/store';
import { signOut } from '@/redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAllItemsInCart } from '@/services/cartService';
import CategoriesDropdown from './CategoriesDropdown';
import { getAllProducts } from '@/services/productService';
import SearchResult from './common/SearchResult';
import { Tooltip } from '@mui/material';

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Thông Báo', 'Đăng Nhập', 'Đăng ký'];

export default function DrawerAppBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const User = useAppSelector((state) => state.authReducer.value);
    const dispatch = useDispatch();
    const router = useRouter();

    const [listItemsInCart, setListItemsInCart] = React.useState<any>([]);
    const [listProducts, setListProducts] = React.useState<any>([]);
    const [listSearch, setListSearch] = React.useState<any>([]);
    const [openResult, setOpenResult] = React.useState<any>(false);

    const handleGetAllProducts = async () => {
        try {
            const data: any = await getAllProducts();
            if (data.EC == 0) {
                setListProducts(data.DT);
            }
        } catch (error) {
            alert(error);
        }
    }

    const handleChangeValue = async (e: any) => {
        if (e.target.value != '') {
            setOpenResult(true);
        } else {
            setOpenResult(false);
        }

        if (listProducts && e.target.value !== '') {
            const data: any = listProducts.filter((product: any, index: number) => {
                if (product.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return product.name.toLowerCase();
                }
            })

            if (data) {
                setListSearch(data);
            }
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('accesstoken');
        dispatch(signOut());
        router.push('/');
    }

    const getAllProductsInCart = async () => {
        if (localStorage.getItem('accesstoken')) {
            try {
                const items: any = await getAllItemsInCart();
                if (items.EC == 0) {
                    setListItemsInCart(items.DT.Products);
                } else {
                    localStorage.removeItem('accesstoken');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    React.useEffect(() => {
        getAllProductsInCart();
        handleGetAllProducts();
    }, [listItemsInCart?.length]);

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
                                    onChange={handleChangeValue}
                                />
                                {(openResult) && <SearchResult result={listSearch} />}
                            </Search>

                            <Tooltip title="Tìm kiếm bằng ảnh" placement="top">
                                <Link href={"/imagesearch"}>
                                    <IconButton>
                                        {/* <ImageSearchIcon sx={{ fontSize: '30px', color: 'white' }} /> */}
                                        <img style={{width: '32px'}} src="https://cdn-icons-png.flaticon.com/128/273/273527.png?ga=GA1.1.1538859696.1700853912&semt=ais" alt="" />
                                    </IconButton>
                                </Link>
                            </Tooltip>

                        </Typography>

                        <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
                            <ul className='navItemsLink'>
                                {
                                    User.isAuth ? (
                                        <>
                                            <li className='navLink containNavCart'>
                                                <span className='spanCart'>
                                                    <LocalMallIcon className='cartIcon' />
                                                </span>
                                                <div className='navCart'>
                                                    <NestedListItems listItemsInCart={listItemsInCart} />
                                                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        {
                                                            (listItemsInCart?.length > 2) ? (
                                                                <p style={{ marginRight: '40px', fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.6)' }}>còn {listItemsInCart?.length - 2} sản phẩm khác</p>
                                                            ) : ''
                                                        }
                                                        <button onClick={() => { router.push('/cart') }}>Xem giỏ hàng</button>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='navLink containNavProfile'>
                                                <span className='accountEmail'>
                                                    <AccountCircleIcon className='accountEmail-icon' />
                                                </span>
                                                <div className='navProfile'>
                                                    <ul>
                                                        <li onClick={() => router.push('/account/profile')}>
                                                            Tài Khoản Của Tôi
                                                        </li>
                                                        <li onClick={handleSignOut}>
                                                            Đăng Xuất
                                                        </li>
                                                    </ul>
                                                </div>

                                            </li>
                                        </>
                                    ) : (
                                        <>
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
                                        </>
                                    )
                                }
                            </ul>
                        </Box>
                    </Toolbar>
                    <Toolbar className='toolBar_2'>
                        <ul className='navItemsLink'>
                            <li className='navSubLink'>
                                <Link href="http://localhost:3001/#Introduce">
                                    <Button sx={{ color: '#fff' }}>
                                        Giới Thiệu
                                    </Button>
                                </Link>
                            </li>
                            <li className='navSubLink'>
                                <Link href="http://localhost:3001/#Products">
                                    <Button sx={{ color: '#fff' }}>
                                        Sản Phẩm
                                    </Button>
                                </Link>
                            </li>
                            <li className='navSubLink'>
                                <Link href="http://localhost:3001/#Contacts">
                                    <Button sx={{ color: '#fff' }}>
                                        Liên Hệ
                                    </Button>
                                </Link>
                            </li>
                            <li className='navSubLink'>
                                <CategoriesDropdown />
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