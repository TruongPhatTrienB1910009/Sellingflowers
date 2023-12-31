import { Box } from '@mui/material'
import React from 'react'
import Comment from './Comment'

const ListComment = ({ listComment, handleGetAllReviews }: any) => {
    return (
        <Box>
            {
                listComment.map((comment: any, index: number) => {
                    return <Comment handleGetAllReviews={handleGetAllReviews} comment={comment} key={comment.id}/>
                })
            }
        </Box>
    )
}

export default ListComment