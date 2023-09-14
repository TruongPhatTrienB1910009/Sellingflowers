"use client"
import '@/styles/globals.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem("accesstoken")) {
      router.push("/");
    }
  })

  return (
    <div>
        {children}
    </div>
  )
}