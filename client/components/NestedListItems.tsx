import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { Avatar, Box, ListItemAvatar, Typography } from '@mui/material';
import { VND } from '@/app/utils/VND';
import Link from 'next/link';


export default function NestedListItems({ listItemsInCart }: any) {
    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper', padding: '0' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {
                (listItemsInCart.length > 0) ? (
                    listItemsInCart.map((item: any, index: number) => {
                        if (index > 2) return;
                        return (
                            <Link href={`/product/${encodeURIComponent(item.id)}`} key={index}>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img style={{ width: '100%' }} src={item?.img.slice(item?.img.indexOf('images'))} alt="" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                        <span>{item.name}</span>
                                        <Typography variant="body1" display="block" sx={{ color: 'red' }}>
                                            {VND.format(item.price)}
                                        </Typography>
                                    </Box>
                                </ListItemButton>
                            </Link>
                        )
                    })
                ) : ('hi')
            }
        </List>
    );
}
