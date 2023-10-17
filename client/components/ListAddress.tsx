import { Box } from '@mui/material'
import React from 'react'
import AddressContain from './AddressContain'

const ListAddress = ({ listAddress, handleSelectAddress, handleClose }: { listAddress: any, handleSelectAddress?: any, handleClose?: any }) => {
    return (
        <Box>
            {
                listAddress.map((address: any, index: number) => {
                    return (
                        <div key={address.id}>
                            <AddressContain handleClose={handleClose} address={address} handleSelectAddress={handleSelectAddress}/>
                            {(index != listAddress.length - 1) ? (<hr />) : ''}
                        </div>
                    )
                })
            }
        </Box>
    )
}

export default ListAddress