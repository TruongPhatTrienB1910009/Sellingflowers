"use client"
import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import "@/styles/imagesearch.css"
import { Box, Button, Container } from "@mui/material";
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
                    const products = await getAllProducts();
                    if (products.EC == 0) {
                        const filter = (newResult.DT.map((result: any, index: number) => {
                            if (result.score >= 0.8) {
                                return result.src
                            }
                        })).filter((result: any, index: number) => result != undefined);

                        let list: any = [];

                        for (let i = 0; i < filter.length; i++) {
                            for (let j = 0; j < products.DT.length; j++) {
                                if (products.DT[j].img === filter[i]) {
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
        <Box sx={{
            marginTop: '4px'
        }}>
            <Container sx={{
                backgroundColor: '#fff',
                padding: '10px 0px',
                minHeight: '80vh',
            }} maxWidth='lg'>
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
                            <div className="upload__image-wrapper floating">
                                {
                                    (imageList.length < 1) ? (
                                        <>
                                            <h4>TẢI ẢNH LÊN ĐỂ BẮT ĐẦU TÌM KIẾM</h4>
                                            <img src="/images/upload.png" alt="" />
                                            <button
                                                style={isDragging ? { color: "red" } : { color: "" }}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                                className="btn-upload"
                                            >
                                                Tải ảnh lên
                                            </button>
                                        </>
                                    ) : <div></div>
                                }
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image.data_url} alt="" />
                                        <div className="image-item__btn-wrapper">
                                            <Button onClick={() => onImageUpdate(index)}>Cập nhật</Button>
                                            <Button onClick={() => onImageRemove(index)}>Xóa</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </div>
                <Box className='result'>
                    <WrapperCards listItems={listItems} />
                </Box>
            </Container>
        </Box>
    );
}

