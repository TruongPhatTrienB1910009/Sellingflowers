import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { getAllCategories } from '@/services/homeService';
import Link from 'next/link';

export default function CategoriesDropdown() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [listCategories, setListCategories] = React.useState<any[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGetAllCategories = async () => {
        try {
            const categories = await getAllCategories();
            if(categories.EC == 0) {
                setListCategories(categories.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleGetAllCategories();
    }, []);

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: 'white',
                }}
            >
                Danh mục sản phẩm
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {
                    listCategories.map((category: any, index: number) => {
                        return (
                            <MenuItem key={category.id} onClick={handleClose}>
                                <Link href={`/categories/${category.name}`}>
                                    {`${category.name}`}
                                </Link>
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        </div>
    );
}
