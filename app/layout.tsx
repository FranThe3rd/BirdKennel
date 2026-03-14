import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CustomCursor } from '@/components/custom-cursor'
import './globals.css'
import Chatbot from '@/components/chatbot'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bird Kennel LLC | American Foxhounds & Friends of the Foxhound',
  description: 'Bird Kennel in Ruffin, NC is dedicated to training top quality foxhounds. Friends of the Foxhound is a nonprofit providing foster care and adoption services to American Foxhounds in need.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo.png',
      },
     
    ],
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <CustomCursor />
        <Chatbot/>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
