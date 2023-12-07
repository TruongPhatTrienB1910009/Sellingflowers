'use client';
import { useDispatch } from "react-redux";
import { signIn, signOut } from "@/redux/features/auth-slice";
import { useEffect, useState } from "react";
import { handleAutoSignIn } from "@/services/homeService";
import { useRouter } from "next/navigation";
import "@/styles/home.css";
import NavCategories from "@/components/NavCategories";
import { filterProducts, getAllProducts, sortProducts } from "@/services/productService";
import WrapperCards from "@/components/common/WrapperCards";
import Breadcrumb from "@/components/common/BreadCrums";
import { Container } from "@mui/material";

export default function Category({ params }: { params: { category: string } }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [listItems, setListItems] = useState<any[]>([]);


    const handleSortProducts = async () => {
        try {
            const urlSearchParams = new URLSearchParams(window.location.search);
            if (urlSearchParams.get('sortBy') == 'ctime') {
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
                        const filter = (products.map((product: any, index: number) => {
                            if (product.Category.name == decodeURIComponent(params.category)) {
                                return product;
                            }
                        })).filter((item: any, index: number) => item != undefined);
                        if (filter) {
                            console.log("filter", filter)
                            const arr = [];
                            for (let i = 0; i < result.DT.length; i++) {
                                console.log(i);
                                for (let j = 0; j < filter.length; j++) {
                                    console.log("urlSearchParams", urlSearchParams.get('sortBy'))
                                    if (urlSearchParams.get('sortBy') == 'sales') {
                                        if (filter[j].id == result.DT[i].ProductId) {
                                            arr.push(filter[j]);
                                            console.log(arr);
                                        }
                                    } else {
                                        if (filter[j].id == result.DT[i].id) {
                                            arr.push(filter[j]);
                                        }
                                    }
                                }
                            }

                            setListItems(arr);
                        }
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

    const checkUser = async () => {
        const token = localStorage.getItem("accesstoken");
        if (token) {
            const user = await handleAutoSignIn({ token });
            if (user && user.EC == 0) {
                dispatch(signIn(user.DT));
            } else {
                localStorage.removeItem("accesstoken");
                dispatch(signOut(user.DT));
                router.push("/");
            }
        }
    }

    const handleGetAllProducts = async () => {
        try {
            const products = await getAllProducts();
            if (products.EC == 0) {
                const filter = (products.DT.map((product: any, index: number) => {
                    if (product.Category.name == decodeURIComponent(params.category)) {
                        return product;
                    }
                })).filter((item: any, index: number) => item != undefined);

                if (filter) {
                    setListItems(filter)
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
        checkUser();
    }, [])
    
    return (
        <Container maxWidth='xl'>
            <div className="homeLayout">
                <div className="leftLayout">
                    <div className="leftContainer">
                        <NavCategories handleGetAllProducts={handleGetAllProducts} handleFilterProducts={handleFilterProducts} handleSortProducts={handleSortProducts} />
                    </div>
                </div>
                <div className="rightLayout">
                    <Breadcrumb slide={decodeURIComponent(params.category)} />
                    <hr style={{ margin: '10px 0px', color: '#228b22' }} />
                    <WrapperCards listItems={listItems} />
                </div>
            </div>
        </Container>
    )
}
