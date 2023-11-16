"use client"
import React, { useState } from 'react'
import "@/styles/globals.css";
import Navbar from '@/components/NavBar';
import StickyFooter from '@/components/Footer'
import NextNProgress from 'nextjs-progressbar';


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className='app'>
                <NextNProgress/>
                {children}
            </main>
            <StickyFooter />
        </>
    )
}

export default MainLayout