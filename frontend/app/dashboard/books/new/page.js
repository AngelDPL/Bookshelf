"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { createBook } from "@/services/api"
import Link from "next/link"

const NewBookPage = () => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [totalPages, setTotalPages] = useState("")
    const [coverUrl, setCoverUrl] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const data = await createBook({
            title,
            author,
            total_pages: totalPages ? parseInt(totalPages) : null,
            cover_url: coverUrl || null,
        })

        router.push("/dashboard")
    }

    return (
        <main className="max-w-lg mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
                    ← Volver
                </Link>
                <h1 className="text-2xl font-bold">Añadir libro</h1>
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Título *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                />
                <input
                    type="text"
                    placeholder="Autor *"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                />
                <input
                    type="number"
                    placeholder="Páginas totales"
                    value={totalPages}
                    onChange={(e) => setTotalPages(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                    type="url"
                    placeholder="URL de portada"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-500 text-white rounded-lg py-2 font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
                >
                    {loading ? "Guardando..." : "Añadir libro"}
                </button>
            </form>
        </main>
    )
}

export default NewBookPage