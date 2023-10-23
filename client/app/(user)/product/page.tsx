'use client';
import { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import WrapperCards from "@/components/common/WrapperCards";
import { getAllProducts } from "@/services/productService";
import "@/styles/home.css";

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
                    <div className="containFilter">
                        <h3>Phân Loại</h3>
                        <ul>
                            <li>
                                Cây cảnh
                            </li>
                            <li>
                                Hoa tươi
                            </li>
                        </ul>
                    </div>
                    <div className="containFilter">
                        <h3>Kích Thước</h3>
                        <FormControl className="formSizeOfTrees">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="all"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel className="formControl" value="all" control={<Radio />} label="Tất cả" />
                                <FormControlLabel className="formControl" value="50" control={<Radio />} label="Dưới 50cm" />
                                <FormControlLabel className="formControl" value="50to100" control={<Radio />} label="50cm - 1m" />
                                <FormControlLabel className="formControl" value="100" control={<Radio />} label="Trên 1m" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="containFilter">
                        <h3>Khoảng Giá</h3>
                        <FormControl className="formSizeOfTrees">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="allprice"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel className="formControl" value="allprice" control={<Radio />} label="Tất cả" />
                                <FormControlLabel className="formControl" value="500" control={<Radio />} label="Dưới 500k" />
                                <FormControlLabel className="formControl" value="500to2000" control={<Radio />} label="500k - 2tr" />
                                <FormControlLabel className="formControl" value="2000" control={<Radio />} label="Trên 2tr" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="rightLayout">
                <WrapperCards listItems={listProducts} />
            </div>
        </div>
    )
}