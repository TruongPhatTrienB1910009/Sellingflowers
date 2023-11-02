import { Box } from '@mui/material'
import React from 'react'
import AddressContain from './AddressContain'

const ListAddress = ({ listAddress, handleSelectAddress, handleClose, handleGetAllAddress }: { listAddress: any, handleSelectAddress?: any, handleClose?: any, handleGetAllAddress?: any }) => {
    return (
        <Box>
            {
                listAddress.map((address: any, index: number) => {
                    return (
                        <div key={address.id} style={{
                            backgroundColor: "#fff",
                            marginBottom: '10px'
                        }}>
                            <AddressContain handleGetAllAddress={handleGetAllAddress} handleClose={handleClose} address={address} handleSelectAddress={handleSelectAddress}/>
                        </div>
                    )
                })
            }
        </Box>
    )
}

export default ListAddress