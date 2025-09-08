import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Ken Tuei Portfolio',
  description: 'Portfolio of Ken Kipkirui Tuei',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  )
}
