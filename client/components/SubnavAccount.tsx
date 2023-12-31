"use client"
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Person2Icon from '@mui/icons-material/Person2';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useRouter } from 'next/navigation';

export default function SubnavAccount() {
    const router = useRouter();
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingBottom: '0px' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader">
            //         Nested List Items
            //     </ListSubheader>
            // }
        >
            <ListItemButton onClick={() => {router.push('/account/profile')}} sx={{
                padding: '16px'
            }}>
                <ListItemIcon>
                    <Person2Icon />
                </ListItemIcon>
                <ListItemText primary="Hồ sơ" />
            </ListItemButton>
            <ListItemButton onClick={() => {router.push('/account/address')}} sx={{
                padding: '16px'
            }}>
                <ListItemIcon>
                    <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Địa chỉ" />
            </ListItemButton>
            <ListItemButton onClick={() => {router.push('/account/receipts')}} sx={{
                padding: '16px'
            }}>
                <ListItemIcon>
                    <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Đơn mua" />
            </ListItemButton>
        </List>
    );
}
