'use client';
import { useAppSelector } from "@/redux/store"

export default function Home() {
  const User = useAppSelector((state) => state.authReducer.value);
  console.log("User", User);
  return (
    <div>
      {User.account.email}
    </div>
  )
}
