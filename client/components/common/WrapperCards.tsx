import React from 'react'
import CardComponent from "@/components/common/Card";
import { Box, Grid, Hidden } from '@mui/material';

interface proplist {
    listItems: any;
}

const WrapperCards: React.FC<proplist> = ({ listItems }) => {
    return (
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Grid container spacing={2}>
                {
                    listItems.map((item: any, index: number) => {
                        return (
                            <Grid key={index} item xs={12} md={4} sm={6} lg={3}>
                                <CardComponent item={item} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box >
    )
}

export default WrapperCards