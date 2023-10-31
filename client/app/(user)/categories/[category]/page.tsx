'use client';
import { useDispatch } from "react-redux";
import { signIn, signOut } from "@/redux/features/auth-slice";
import { useEffect, useState } from "react";
import { handleAutoSignIn } from "@/services/homeService";
import { useRouter } from "next/navigation";
import "@/styles/home.css";
import NavCategories from "@/components/NavCategories";
import { getAllProducts } from "@/services/productService";
import WrapperCards from "@/components/common/WrapperCards";
import Breadcrumb from "@/components/common/BreadCrums";

export default function Category({ params }: { params: { category: string } }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [listItems, setListItems] = useState<any[]>([]);

    console.log(decodeURIComponent(params.category))

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
            if(products.EC == 0) {
                const filter = (products.DT.map((product: any, index: number) => {
                    if(product.Category.name == decodeURIComponent(params.category)) {
                        return product;
                    }
                })).filter((item: any, index: number) => item != undefined);

                if(filter) {
                    setListItems(filter)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetAllProducts();
        checkUser();
    }, [])
    return (
        <div className="homeLayout">
            <div className="leftLayout">
                <div className="leftContainer">
                    <NavCategories />
                </div>
            </div>
            <div className="rightLayout">
                <Breadcrumb slide={decodeURIComponent(params.category)}/>
                <hr style={{margin: '10px 0px', color: '#228b22'}} />
                <WrapperCards listItems={listItems} />
            </div>
        </div>
    )
}
