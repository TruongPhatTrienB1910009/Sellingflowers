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