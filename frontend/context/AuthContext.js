"use client"

import { createContext, useContext, useState, useEffect} from "react"
import { getMe } from "@/services/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)


    const login = (userData, tokenData) => {
        setUser(userData)
        setToken(tokenData)
        localStorage.setItem("token", tokenData)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
    }

    useEffect(() => {
        const init = async () => {
            const storedToken = localStorage.getItem("token")
            if (storedToken) {
                setToken(storedToken)
                const data = await getMe()
                if (data.id) {
                    setUser(data)
                } else {
                    logout()
                }
            }
            setLoading(false)
        }
            init()
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)