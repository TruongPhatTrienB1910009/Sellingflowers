import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

export default function Filter() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

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
                    <FilterAltOutlinedIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Bộ Lọc" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Bán chạy nhất" />
                    </ListItemButton>
                </List>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Mới nhất" />
                    </ListItemButton>
                </List>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <select style={{
                            width: '100%',
                            fontSize: '16px',
                            border: '1px solid #228b22',
                            padding: '4px 0px',
                        }} name="price" id="price">
                            <option value="asc">Giá: Từ thấp đến cao</option>
                            <option value="saab">Giá: Từ cao đến thấp</option>
                        </select>
                    </ListItemButton>
                </List>
                <List component="div" disablePadding>
                    <ListItemButton sx={{
                        display: "flex",
                        flexDirection: "column",
                        pl: 4,
                        justifyContent: 'flex-start',
                    }}>
                        <ListItemText sx={{width: '100%'}} primary="Khoảng giá:" />
                        <input style={{ padding: '6px', width: '100%', marginBottom: '6px' }} placeholder='Từ' type="text" />
                        <input style={{ padding: '6px', width: '100%' }} placeholder='Đến' type="text" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}
