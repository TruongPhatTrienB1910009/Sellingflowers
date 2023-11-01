'use client';
import { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import WrapperCards from "@/components/common/WrapperCards";
import { filterProducts, getAllProducts, sortProducts } from "@/services/productService";
import "@/styles/home.css";
import NavCategories from "@/components/NavCategories";

export default function Home() {
    const [listItems, setListItems] = useState([]);

    const handleGetAllProducts = async () => {
        try {
            const data = await getAllProducts();
            if (data.EC == 0) {
                setListItems(data.DT);
            }
        } catch (error) {
            alert(error);
        }
    }

    const handleSortProducts = async () => {
        try {
            const urlSearchParams = new URLSearchParams(window.location.search);
            if(urlSearchParams.get('sortBy') == 'ctime') {
                handleGetAllProducts();
            }
            if (urlSearchParams.get('sortBy')) {
                const result = await sortProducts({
                    sortBy: urlSearchParams.get('sortBy'),
                    order: urlSearchParams.get('order'),
                });
                if (result.EC == 0) {
                    const products: any = [...listItems];
                    if (products) {

                        const arr: any = [];
                        for (let i = 0; i < result.DT.length; i++) {
                            console.log(i);
                            for (let j = 0; j < products.length; j++) {
                                console.log("urlSearchParams", urlSearchParams.get('sortBy'))
                                if (urlSearchParams.get('sortBy') == 'sales') {
                                    if (products[j].id == result.DT[i].ProductId) {
                                        arr.push(products[j]);
                                        console.log(arr);
                                    }
                                } else {
                                    if (products[j].id == result.DT[i].id) {
                                        arr.push(products[j]);
                                    }
                                }
                            }
                        }

                        setListItems(arr);

                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilterProducts = async () => {
        try {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const maxPrice = urlSearchParams.get('maxPrice')
            const minPrice = urlSearchParams.get('minPrice')

            console.log(maxPrice, minPrice);

            if (maxPrice && minPrice) {
                const products = await filterProducts({
                    maxPrice: maxPrice,
                    minPrice: minPrice
                })
                if (products.EC == 0) {
                    setListItems(products.DT);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetAllProducts();
        handleSortProducts();
        handleFilterProducts();
    }, []);
    return (
        <div className="homeLayout">
            <div className="leftLayout">
                <div className="leftContainer">
                    <NavCategories handleGetAllProducts={handleGetAllProducts} handleFilterProducts={handleFilterProducts} handleSortProducts={handleSortProducts} />
                </div>
            </div>
            <div className="rightLayout">
                <WrapperCards listItems={listItems} />
            </div>
        </div>
    )
}