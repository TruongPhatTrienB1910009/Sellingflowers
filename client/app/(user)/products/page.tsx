'use client';
import { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import WrapperCards from "@/components/common/WrapperCards";
import { getAllProducts } from "@/services/productService";
import "@/styles/home.css";
import NavCategories from "@/components/NavCategories";

export default function Home() {
    const [listProducts, setListProducts] = useState([]);

    const handleGetAllProducts = async () => {
        try {
            const data = await getAllProducts();
            if(data.EC == 0) {
                setListProducts(data.DT);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        handleGetAllProducts();
    }, [listProducts.length]);
    return (
        <div className="homeLayout">
            <div className="leftLayout">
                <div className="leftContainer">
                    <NavCategories />
                </div>
            </div>
            <div className="rightLayout">
                <WrapperCards listItems={listProducts} />
            </div>
        </div>
    )
}