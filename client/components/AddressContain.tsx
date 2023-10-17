import { Box } from '@mui/material'
import React from 'react'

const AddressContain = ({address}: {address: any}) => {
    console.log(address)
  return (
    <Box component={"div"} sx={{
        padding: '12px',
        minWidth: '400px'
    }}>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
            <h3 style={{marginRight: '10px'}}>{address.name}</h3>
            <span>({address.phone})</span>
        </div>
        <div style={{fontSize: '14px'}}>
            <p>{address.detail}</p>
            <p>{`${address.ward}, ${address.district}, ${address.city}`}</p>
        </div>
    </Box>
  )
}

export default AddressContain