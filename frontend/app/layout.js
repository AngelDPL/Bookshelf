import { AuthProvider } from "@/context/AuthContext"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "BookShelf",
    description: "Tu biblioteca personal",
}

const RootLayout = ({ children }) => {
    return (
        <html lang="es">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}

export default RootLayout