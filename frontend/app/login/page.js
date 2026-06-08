"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { loginUser } from "@/services/api"
import Link from "next/link"
import Logo from "@/components/Logo"
import AuthCard from "@/components/AuthCard"
import Input from "@/components/Input"

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const data = await loginUser({ email, password })

        if (data.error) {
            setError(data.error)
            setLoading(false)
            return
        }

        login(data.user, data.token)
        router.push("/dashboard")
    }

    return (
        <main
            className="min-h-screen flex items-center justify-center px-4"
            style={{ background: "radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f0f 70%)" }}
        >
            <div className="w-full max-w-md animate-fadeIn">

                <div className="mb-8">
                    <Logo />
                </div>

                <AuthCard>
                    <h2 className="text-xl font-bold text-white mb-6 text-center">Bienvenido de vuelta</h2>

                    {error && (
                        <div
                            className="mb-4 rounded-lg text-sm text-red-400"
                            style={{
                                background: "#ef444420",
                                border: "1px solid #ef444440",
                                padding: "12px 16px"
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                        />
                        <Input
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-85 mt-2"
                            style={{
                                background: loading ? "var(--border)" : "var(--accent)",
                                padding: "14px 24px"
                            }}
                        >
                            {loading ? "Entrando..." : "Iniciar sesión"}
                        </button>
                    </form>
                </AuthCard>

                <p className="text-center text-sm mt-6" style={{ color: "var(--text-secondary)" }}>
                    ¿No tienes cuenta?{" "}
                    <Link
                        href="/register"
                        className="font-medium hover:opacity-80 transition-opacity"
                        style={{ color: "var(--accent)" }}
                    >
                        Regístrate
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default LoginPage