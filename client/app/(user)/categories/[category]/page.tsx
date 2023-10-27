'use client';
import { useDispatch } from "react-redux";
import { signIn, signOut } from "@/redux/features/auth-slice";
import { useEffect } from "react";
import { handleAutoSignIn } from "@/services/homeService";
import { useRouter } from "next/navigation";
import "@/styles/home.css";
import NavCategories from "@/components/NavCategories";

export default function Category() {
    const dispatch = useDispatch();
    const router = useRouter();

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

    useEffect(() => {
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
                {/* <WrapperCards listItems={listItems} /> */}
            </div>
        </div>
    )
}
