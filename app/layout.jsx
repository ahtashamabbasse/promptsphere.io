import '@styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
console.log(inter)

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <main className={'app'}>
        {children}
      </main>
      </body>
    </html>
  )
}
