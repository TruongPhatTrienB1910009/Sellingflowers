"use client"
import '@/styles/globals.css'
import LayOut from '@/components/MainLayout';
import { useEffect } from 'react';
import { signIn, signOut } from '@/redux/features/auth-slice';
import { handleAutoSignIn } from '@/services/homeService';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const checkAutoSignIn = async () => {
    if (localStorage.getItem("accesstoken")) {
      const data = await handleAutoSignIn({ token: localStorage.getItem("accesstoken") as string });
      if (data && data.EC == 0) {
        dispatch(signIn(data.DT));
        console.log(data.DT.groupRoles.id === 3);
        if (data.DT.groupRoles.id === 3) {
          router.push("/dashboard")
        }
      } else {
        dispatch(signOut());
        localStorage.removeItem("accesstoken");
      }
    }
  }

  useEffect(() => {
    checkAutoSignIn();
  })

  return (
    <LayOut>
      {children}
    </LayOut>
  )
}