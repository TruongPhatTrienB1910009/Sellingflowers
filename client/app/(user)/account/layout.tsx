import { Box, Container } from "@mui/material"
import SubnavAccount from "@/components/SubnavAccount"


export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <Container maxWidth='xl'>
            <Box sx={{display: 'flex', marginTop: '10px', gap: '8px'}}>
                <div style={{minWidth: '20%'}}>
                    <SubnavAccount />
                </div>
                <Box sx={{
                    backgroundColor: '#fff',
                    width: '100%',
                    minHeight: '100vh',
                    padding: '10px 20px',
                    borderRadius: '5px',
                }}>
                    {children}
                </Box>
            </Box>
        </Container >
    )
}