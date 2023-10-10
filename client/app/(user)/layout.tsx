import '@/styles/globals.css'
import LayOut from '@/components/MainLayout';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return ( 
    <LayOut>
        {children}
    </LayOut>
  )
}