"use client"
import React from 'react'
import "@/styles/globals.css";
import { useEffect } from 'react';
import { handleAutoSignIn } from '@/services/homeService';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '@/redux/features/auth-slice';
import Router from "next/router";
import nProgress from "nprogress";
import '@/styles/nprogress.css';

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const MainLayout = ({ children }: {children: React.ReactNode}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAutoSignIn = async () => {
            if (localStorage.getItem("accesstoken")) {
                const data = await handleAutoSignIn({ token: localStorage.getItem("accesstoken") as string });
                if (data && data.EC == 0) {
                    dispatch(signIn(data.DT));
                } else {
                    dispatch(signOut(data.DT));
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