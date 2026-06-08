import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
    title: "BookShelf",
    description: "Tu biblioteca personal",
}

const RootLayout = ({ children }) => {
    return (
        <html lang="es">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}

export default RootLayout