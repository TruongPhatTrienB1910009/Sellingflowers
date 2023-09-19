import React from 'react'
import CardComponent from "@/components/common/Card";
import { Box, Grid, Hidden } from '@mui/material';
import Link from 'next/link';

interface proplist {
    listItems: any;
}

const WrapperCards: React.FC<proplist> = ({ listItems }) => {
    console.log(listItems)
    return (
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Grid container spacing={2}>
                {
                    listItems.map((item: any, index: number) => {
                        return (
                            <Grid key={index} item xs={12} md={4} sm={6} lg={3}>
                                <Link href={`/product/details/${item.id}`}>
                                    <CardComponent item={item} />
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box >
    )
}

export default WrapperCards