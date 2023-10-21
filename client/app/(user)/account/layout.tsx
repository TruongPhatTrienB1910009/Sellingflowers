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
                    width: '100%'
                }}>
                    {children}
                </Box>
            </Box>
        </Container >
    )
}