import { Box, Link } from '@mui/material'
import React from 'react'

const SearchResult = ({ result }: { result: any }) => {
    console.log(result)
    return (
        <div style={{ backgroundColor: '#439c43', width: '100%', position: 'absolute', zIndex: '100' }}>
            {
                (result.length > 0) ? (
                    result.map((value: any, index: number) => {
                        return (
                            <Link key={value.id} href={`/products/${value.id}`} sx={{textDecoration: 'none'}}>
                                <Box sx={{
                                    padding: '8px 48px', fontSize: '16px',
                                    color: 'white',
                                    textDecoration: 'none',
                                    ':hover': {
                                        cursor: 'pointer',
                                        backgroundColor: '#ccc'
                                    }
                                }}>
                                    {value.name}
                                </Box>
                            </Link>
                        )
                    })
                ) : (
                    <Box sx={{
                        padding: '8px 48px', fontSize: '16px',
                        color: 'white',
                        ':hover': {
                            cursor: 'pointer',
                            backgroundColor: '#ccc'
                        }
                    }}>
                        Không tìm thấy kết quả
                    </Box>
                )
            }
        </div>
    )
}

export default SearchResult