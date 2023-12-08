"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BillWaiting from '@/components/BillWaiting';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Receipts() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const labels = ["Tất Cả", "Chờ Xác Nhận", "Đã Xác Nhận", "Đã Hủy"]

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#fff'}}>
                <Tabs sx={{ width: '100%' }} centered textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        labels.map((label: any, index: number) => {
                            return (
                                <Tab key={label} sx={{ width: '25%' }} label={`${label}`} {...a11yProps(index)} />
                            )
                        })
                    }
                </Tabs>
            </Box>
            {
                labels.map((label: any, index: number) => {
                    return (
                        <CustomTabPanel key={label} value={value} index={index}>
                            <BillWaiting type={index} />
                        </CustomTabPanel>
                    )
                })
            }
        </Box>
    );
}
