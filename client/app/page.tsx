'use client';
import { useDispatch } from "react-redux";
import { signIn, signOut } from "@/redux/features/auth-slice";
import { useEffect } from "react";
import { handleAutoSignIn } from "@/services/homeService";
import { useRouter } from "next/navigation";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import WrapperCards from "@/components/common/WrapperCards";
import { listItems } from "@/data/test";
import "@/styles/home.css";

export default function Home() {
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
                    <div className="containFilter">
                        <h3>Phân Loại</h3>
                        <ul>
                            <li>
                                Tất cả
                            </li>
                            <li>
                                Sân vườn
                            </li>
                            <li>
                                Trong nhà
                            </li>
                            <li>
                                Cây để bàn
                            </li>
                            <li>
                                Thủy sinh
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
                <WrapperCards listItems={listItems} />
            </div>
        </div>
    )
}
