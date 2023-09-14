'use client';
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/features/auth-slice";
import { useEffect } from "react";
import { handleAutoSignIn } from "@/services/homeService";


export default function Home() {
  const dispatch = useDispatch();
  const User = useAppSelector((state) => state.authReducer.value);

  const checkUser = async () => {
    const token = localStorage.getItem("accesstoken");
    if(token) {
      const user = await handleAutoSignIn({token});
      if(user && user.EC == 0) {
        dispatch(signIn(user.DT));
      } 
    }
  }

  useEffect(() => {
    checkUser();
  }, [])
  return (
    <div>
      {User.account.email}
    </div>
  )
}
