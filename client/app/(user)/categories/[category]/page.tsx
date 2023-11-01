'use client';
import { useDispatch } from "react-redux";
import { signIn, signOut } from "@/redux/features/auth-slice";
import { useEffect, useState } from "react";
import { handleAutoSignIn } from "@/services/homeService";
import { useRouter } from "next/navigation";
import "@/styles/home.css";
import NavCategories from "@/components/NavCategories";
import { getAllProducts, sortProducts } from "@/services/productService";
import WrapperCards from "@/components/common/WrapperCards";
import Breadcrumb from "@/components/common/BreadCrums";

export default function Category({ params }: { params: { category: string } }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [listItems, setListItems] = useState<any[]>([]);
    const urlSearchParams = new URLSearchParams(window.location.search);


    const handleSortProducts = async () => {
        try {
            if (urlSearchParams.get('sortBy')) {
                const result = await sortProducts({
                    sortBy: urlSearchParams.get('sortBy'),
                    order: urlSearchParams.get('order'),
                });
                console.log("run")
                console.log(urlSearchParams.get('sortBy'))
                console.log(result);
                if (result.EC == 0) {
                    const products = await getAllProducts();
                    if (products.EC == 0) {
                        const filter = (products.DT.map((product: any, index: number) => {
                            if (product.Category.name == decodeURIComponent(params.category)) {
                                return product;
                            }
                        })).filter((item: any, index: number) => item != undefined);
                        if (filter) {
                            const arr = [];
                            for(let i = 0; i < result.DT.length; i++) {
                                console.log(i);
                                for(let j = 0; j < filter.length; j++) {
                                    console.log("urlSearchParams", urlSearchParams.get('sortBy'))
                                    if(urlSearchParams.get('sortBy') == 'sales') {
                                        if(filter[j].id == result.DT[i].ProductId) {
                                            arr.push(filter[j]);
                                            console.log(arr);
                                        }
                                    } else {
                                        if(filter[j].id == result.DT[i].id) {
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
        checkUser();
    }, [])
    return (
        <div className="homeLayout">
            <div className="leftLayout">
                <div className="leftContainer">
                    <NavCategories handleSortProducts={handleSortProducts} />
                </div>
            </div>
            <div className="rightLayout">
                <Breadcrumb slide={decodeURIComponent(params.category)} />
                <hr style={{ margin: '10px 0px', color: '#228b22' }} />
                <WrapperCards listItems={listItems} />
            </div>
        </div>
    )
}
