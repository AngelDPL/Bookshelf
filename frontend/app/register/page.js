"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { registerUser } from "@/services/api"
import Link from "next/link"

const RegisterPage = () => {

    const [username, setUsername] = useState("")
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

        const data = await registerUser({ username, email, password })

        if (data.error) {
            setError(data.error)
            setLoading(false)
            return
        }

        login(data.user, data.token)
        router.push("/dashboard")
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
                <h1 className="text-2xl font-bold text-center mb-6">📚 BookShelf</h1>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-500 text-white rounded-lg py-2 font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
                    >
                        {loading ? "Registrando..." : "Crear cuenta"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    ¿Ya tienes cuenta?{" "}
                    <Link href="/login" className="text-indigo-500 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default RegisterPage