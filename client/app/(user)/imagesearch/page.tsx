"use client"
import React from "react";
import ImageUploading from "react-images-uploading";

import "@/styles/imagesearch.css"
import { Container } from "@mui/material";

export default function App() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <Container maxWidth='md'>
            <div className="App">
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    acceptType={["jpg"]}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: "red" } : { color: "" }}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Tải ảnh lên
                            </button>
                            &nbsp;
                            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.data_url} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
        </Container>
    );
}











// import { Box, Container } from '@mui/material'
// import React from 'react'
// import "@/styles/imagesearch.css"

// const page = () => {
//     const getImage = async (e: any) => {
//         console.log(e.target.files[0])
//         try {
//             // const result = await get
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <Container maxWidth='md'>
//             <Box className='main'>
//                 <Box sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center'
//                 }}>
//                     <img src="/images/searchimage.png" alt="" />
//                     <label htmlFor="avatar">Tải ảnh lên (image/png, image/jpeg)</label>
//                     <input onChange={(e) => { getImage(e) }} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
//                 </Box>
//             </Box>
//         </Container>
//     )
// }

// export default page