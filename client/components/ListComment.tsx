import { Box } from '@mui/material'
import React from 'react'
import Comment from './Comment'

const ListComment = ({ listComment }: any) => {
    console.log(listComment)
    return (
        <Box>
            {
                listComment.map((comment: any, index: number) => {
                    return <Comment comment={comment} key={comment.id}/>
                })
            }
        </Box>
    )
}

export default ListComment