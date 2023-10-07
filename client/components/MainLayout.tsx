"use client"
import React, { useState } from 'react'
import "@/styles/globals.css";
import { useEffect } from 'react';
import { handleAutoSignIn } from '@/services/homeService';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '@/redux/features/auth-slice';
import Router from "next/router";
import Navbar from '@/components/NavBar';
import StickyFooter from '@/components/Footer';

import nProgress from "nprogress";
import '@/styles/nprogress.css';
import SubNav from './admin/SubNav';
import { Box } from '@mui/material';

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        const checkAutoSignIn = async () => {
            if (localStorage.getItem("accesstoken")) {
                const data = await handleAutoSignIn({ token: localStorage.getItem("accesstoken") as string });
                if (data && data.EC == 0) {
                    dispatch(signIn(data.DT));
                    console.log(data.DT);
                    if(data.DT.groupRoles.Roles.name == "admin") {
                        setIsAdmin(true);
                    }
                } else {
                    dispatch(signOut(data.DT));
                }
            }
        }

        checkAutoSignIn();
    })

    return (
        
            (isAdmin) ? (
                <Box sx={{minHeight: '100vh', backgroundColor: '#eee'}}>
                    <SubNav />

                </Box>
            ) : (
                <> 
                    <Navbar />
                    <main className='app'>
                        {children}
                    </main>
                    <StickyFooter />
                </>
            )
    )
}

export default MainLayout