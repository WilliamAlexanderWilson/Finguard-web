import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinGuard - AI-Powered Accounting Automation',
  description: 'Automate your bookkeeping with AI. 95% accuracy, 10+ hours saved per week.',
  keywords: 'AI accounting, bookkeeping automation, financial software, Claude AI',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="sg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%233b82f6"/><stop offset="100%" style="stop-color:%231e40af"/></linearGradient><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2360a5fa"/><stop offset="100%" style="stop-color:%238b5cf6"/></linearGradient></defs><path d="M50 10 L80 25 L80 55 Q80 75 50 90 Q20 75 20 55 L20 25 Z" fill="url(%23sg)" stroke="%231e3a8a" stroke-width="2"/><path d="M40 65 L50 35 L60 65 L50 55 Z" fill="url(%23fg)" stroke="%23fff" stroke-width="1"/></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
