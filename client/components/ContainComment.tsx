import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ListComment from './ListComment';
import { useAppSelector } from '@/redux/store';

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
                <Box sx={{ padding: '0px 8px' }}>
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

export default function ContainComment({ listComment }: any) {
    const [value, setValue] = React.useState(0);
    const user = useAppSelector((state) => state.authReducer.value.account);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [listCommentFilter, setListCommentFilter] = React.useState<any>([]);

    const handleFilterComment = () => {
        const comments = listComment.filter((comment: any, index: number) => {
            if(comment.Account.email === user.email) {
                return comment;
            }
        })

        if(comments.length > 0) {
            setListCommentFilter(comments);
        }
    }

    React.useEffect(() => {
        handleFilterComment();
    }, [listComment.length]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tất Cả Đánh Giá" {...a11yProps(0)} />
                    <Tab label="Đánh Giá Của Bạn" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ListComment listComment={listComment}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ListComment listComment={listCommentFilter}/>
            </CustomTabPanel>
        </Box>
    );
}