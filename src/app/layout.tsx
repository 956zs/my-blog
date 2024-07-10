import 'bootstrap/dist/css/bootstrap.min.css';
import { ClientNavbar } from './ClientComponents';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientNavbar />
        <main>
          <div className="container mt-4">
            {children}
          </div>
        </main>
        <footer className="mt-4 py-3 bg-light">
          <div className="container">
            <p className="text-center">© 2024 My Blog. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}