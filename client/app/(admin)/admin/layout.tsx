"use client"
import '@/styles/globals.css'
import { Suspense, useEffect } from 'react';
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
        if (localStorage.getItem("admintoken")) {
            const data = await handleAutoSignIn({ token: localStorage.getItem("admintoken") as string });
            if (data && data.EC == 0) {
                dispatch(signIn(data.DT));
            } else {
                dispatch(signOut());
                localStorage.removeItem("admintoken");
            }
        }
    }

    useEffect(() => {
        checkAutoSignIn();
    })

    return (
        <>
            {children}
        </>
    )
}