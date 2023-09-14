'use client';
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "@/redux/features/auth-slice";
import { useEffect } from "react";
import { handleAutoSignIn } from "@/services/homeService";
import { useRouter } from "next/navigation";


export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const User = useAppSelector((state) => state.authReducer.value);

  const checkUser = async () => {
    const token = localStorage.getItem("accesstoken");
    if(token) {
      const user = await handleAutoSignIn({token});
      if(user && user.EC == 0) {
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
    <div>
      
    </div>
  )
}
