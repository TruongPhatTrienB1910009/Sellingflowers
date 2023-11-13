"use client"
import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";

import "@/styles/imagesearch.css"
import { Box, Container } from "@mui/material";
import { deleteAllFiles, storeImage } from "@/services/searchService";
import { searchImage } from "@/services/manageimages";
import { getAllProducts } from "@/services/productService";
import WrapperCards from "@/components/common/WrapperCards";

export default function App() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const [listItems, setListItems] = React.useState([]);
    const [show, setShow] = React.useState(false);
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
                const newResult = await searchImage({ imagePath: result.DT })
                if (newResult.EC == 0) {
                    console.log(newResult.DT)
                    const products = await getAllProducts();
                    if (products.EC == 0) {
                        const filter = (newResult.DT.map((result: any, index: number) => {
                            if (result.score >= 0.8) {
                                return result.src
                            }
                        })).filter((result: any, index: number) => result != undefined);

                        let list: any = [];

                        for(let i = 0; i < filter.length; i++) {
                            for(let j = 0; j < products.DT.length; j++) {
                                if(products.DT[j].img === filter[i]) {
                                    list.push(products.DT[j]);
                                    break;
                                }
                            }
                        }

                        if (list.length > 0) {
                            setListItems(list);
                            setShow(!show);
                        }
                    }
                }
            }
        } else {
            setListItems([]);
        }
    };

    useEffect(() => {

    }, [show])

    return (
        <Container maxWidth='lg'>
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
                <Box>
                    <WrapperCards listItems={listItems} />
                </Box>
            </div>
        </Container>
    );
}

