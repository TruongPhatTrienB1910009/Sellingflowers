import { MainChart } from '@/components/admin/dashboard/MainChart'
import { Box } from '@mui/material'
import React from 'react'

const Admin = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <Box sx={{
        display: 'flex',
        gap: '10px',
      }}>
        <Box sx={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '10px',
          width: '50%',
          height: '250px'
        }}>

        </Box>

        <Box sx={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '10px',
          width: '50%',
        }}>

        </Box>

        <Box sx={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '10px',
          width: '50%',
        }}>

        </Box>
      </Box>

      <Box sx={{
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '10px',
      }}>
        <MainChart />
      </Box>
    </Box>
  )
}

export default Admin