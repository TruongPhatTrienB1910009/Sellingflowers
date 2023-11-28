"use client"
import '@/styles/globals.css'
import { Box, Container } from '@mui/material';
import AppBarAdmin from '@/components/admin/AppBarAdmin';
import SubNav from '@/components/admin/SubNav';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#eee', display: 'flex' }}>
            <SubNav />
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <AppBarAdmin />
                <Container maxWidth="xl" sx={{'@media (min-width: 600px)': {
                    padding: '6px'
                }}}>
                    {children}
                </Container>
            </Box>
        </Box>
    )
}