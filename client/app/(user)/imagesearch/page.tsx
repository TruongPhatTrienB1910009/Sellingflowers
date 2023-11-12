"use client"
import React from "react";
import ImageUploading from "react-images-uploading";

import "@/styles/imagesearch.css"
import { Container } from "@mui/material";
import { deleteAllFiles, storeImage } from "@/services/searchService";

export default function App() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = async (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);

        if (imageList[0]) {
            await deleteAllFiles();
            const result = await storeImage({
                img: imageList[0].file
            })

            if (result.EC == 0) {
                console.log(result.DT);
            }
        }
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
                    acceptType={["jpg", "png", "jpeg"]}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            {
                                (imageList.length < 1) ? (
                                    <button
                                        style={isDragging ? { color: "red" } : { color: "" }}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Tải ảnh lên
                                    </button>
                                ) : <div></div>
                            }
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

