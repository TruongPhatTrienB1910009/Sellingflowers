import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { getAllCategories, getAllTypeCategories } from '@/services/homeService';
import Link from 'next/link';

export default function NavCategories() {
    const [listCategories, setListCategories] = React.useState<any[]>([]);
    const [listTypeCategories, setListTypeCategories] = React.useState<any[]>([]);

    const handleGetAllCategories = async () => {
        try {
            const categories = await getAllCategories();
            if (categories.EC == 0) {
                setListCategories(categories.DT);
                console.log(categories.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetAllTypeCategories = async () => {
        try {
            const typeCategories = await getAllTypeCategories();
            if (typeCategories.EC == 0) {
                setListTypeCategories(typeCategories.DT);
                console.log(typeCategories.DT)
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        handleGetAllCategories();
        handleGetAllTypeCategories();
    }, [listCategories.length, listTypeCategories.length]);

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                {
                    listTypeCategories.map((typeCategories: any, index: number) => {
                        return (
                            <List key={typeCategories.id} sx={{ padding: '0px' }}>
                                <ListItemButton sx={{
                                    backgroundColor: '#228b22', color: 'white',
                                    ':hover': {
                                        backgroundColor: '#228b22', color: 'white',
                                    }
                                }}>
                                    <ListItemText>
                                        {typeCategories.name}
                                    </ListItemText>
                                </ListItemButton>
                                {
                                    listCategories.map((category: any, index: number) => {
                                        if (typeCategories.id == category.TypeCategoryId) {
                                            return (
                                                <Link href={`/categories/${category.name}`} key={category.id}>
                                                    <ListItemButton sx={{
                                                        borderBottom: '2px solid #eee',
                                                    }}>
                                                        <ListItemText>
                                                            {category.name}
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </Link>
                                            )
                                        }
                                    })
                                }
                            </List>
                        )
                    })
                }
            </nav>
            <Divider />
        </Box>
    );
}
