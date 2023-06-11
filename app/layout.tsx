import './globals.css'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
const font = Figtree({ subsets: ['latin'] })
import ModalProvider from '@/providers/ModalProvider'

export const metadata = {
  title: 'Spotify - streaming music app',
  description: 'Universo della musica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
      <SupabaseProvider>
        <UserProvider>
          <ModalProvider />
          <Sidebar>
          {children}
          </Sidebar>
        </UserProvider>
      </SupabaseProvider>
      </body>
    </html>
  )
}
