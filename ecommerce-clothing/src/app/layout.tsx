import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clothify - Modern Apparel',
  description: 'E-commerce for a modern clothing brand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold">Clothify</a>
            <nav className="flex items-center gap-4">
              <a href="/products" className="hover:underline">Products</a>
              <a href="/cart" className="hover:underline">Cart</a>
              <a href="/admin" className="hover:underline">Admin</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>
        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Clothify
          </div>
        </footer>
      </body>
    </html>
  )
}

