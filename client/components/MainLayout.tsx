import React from 'react'
import "@/styles/globals.css";
import { useEffect } from 'react';
import { handleAutoSignIn } from '@/services/homeService';
import { useDispatch } from 'react-redux';
import { signIn } from '@/redux/features/auth-slice';

const MainLayout = ({ children }: {children: React.ReactNode}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAutoSignIn = async () => {
            if (localStorage.getItem("accesstoken")) {
                const data = await handleAutoSignIn(localStorage.getItem("accesstoken") as string);
                if (data && data.EC == 0) {
                    dispatch(signIn(data.DT));
                }
            }
        }

        checkAutoSignIn();
    })

    return (
        <main className='app'>
            {children}
        </main>
    )
}

export default MainLayout