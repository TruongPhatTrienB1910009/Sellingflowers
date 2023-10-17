import { Box } from '@mui/material'
import React from 'react'
import AddressContain from './AddressContain'

const ListAddress = ({ listAddress }: { listAddress: any }) => {
    return (
        <Box>
            {
                listAddress.map((address: any, index: number) => {
                    return (
                        <div key={address.id}>
                            <AddressContain address={address} />
                            {(index != listAddress.length - 1) ? (<hr />) : ''}
                        </div>
                    )
                })
            }
        </Box>
    )
}

export default ListAddress