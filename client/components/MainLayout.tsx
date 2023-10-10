"use client"
import React, { useState } from 'react'
import "@/styles/globals.css";
import { useEffect } from 'react';
import { handleAutoSignIn } from '@/services/homeService';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '@/redux/features/auth-slice';
import { useRouter } from "next/navigation";
import Navbar from '@/components/NavBar';
import StickyFooter from '@/components/Footer';


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const checkAutoSignIn = async () => {
            if (localStorage.getItem("accesstoken")) {
                const data = await handleAutoSignIn({ token: localStorage.getItem("accesstoken") as string });
                if (data && data.EC == 0) {
                    dispatch(signIn(data.DT));
                    if (data.DT.groupRoles.name === "admin") {
                        router.push("/dashboard")
                    }
                } else {
                    dispatch(signOut());
                    localStorage.removeItem("accesstoken");
                }
            }
        }

        checkAutoSignIn();
    })

    return (
        <>
            <Navbar />
            <main className='app'>
                {children}
            </main>
            <StickyFooter />
        </>
    )
}

export default MainLayout