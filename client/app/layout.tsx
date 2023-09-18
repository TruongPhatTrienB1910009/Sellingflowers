"use client"
import '@/styles/globals.css'
import type { Metadata } from 'next'
import Router from "next/router";
import Navbar from '@/components/NavBar';
import StickyFooter from '@/components/Footer';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import LayOut from '@/components/MainLayout';
import { ReduxProvider } from '@/redux/provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({
  showSpinner: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} >
        <ReduxProvider>
          <ScopedCssBaseline>
            <Navbar />
              <LayOut>
                {children}
              </LayOut>
            <StickyFooter />
          </ScopedCssBaseline>
        </ReduxProvider>
      </body>
    </html>
  )
}
