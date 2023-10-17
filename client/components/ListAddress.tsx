import { Box } from '@mui/material'
import React from 'react'
import AddressContain from './AddressContain'

const ListAddress = ({listAddress}: {listAddress: any}) => {
  return (
    <Box>
        {
            listAddress.map((address: any, index: number) => {
                return (
                    <AddressContain />
                )
            })
        }
    </Box>
  )
}

export default ListAddress