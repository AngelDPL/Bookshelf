"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { getBook, updateBook } from "@/services/api"
import Link from "next/link"

const EditBookPage = () => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [totalPages, setTotalPages] = useState("")
    const [coverUrl, setCoverUrl] = useState("")
    const [status, setStatus] = useState("pending")
    const [rating, setRating] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const { user } = useAuth()
    const router = useRouter()
    const { id } = useParams()

    useEffect(() => {
        if (!user) {
            router.push("/login")
            return
        }

        const fetchBook = async () => {
            const data = await getBook(id)
            if (data.error) {
                router.push("/dashboard")
                return
            }
            setTitle(data.title)
            setAuthor(data.author)
            setTotalPages(data.total_pages || "")
            setCoverUrl(data.cover_url || "")
            setStatus(data.status)
            setRating(data.rating || "")
            setLoading(false)
        }

        fetchBook()
    }, [user, router, id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError(null)

        const data = await updateBook(id, {
            title,
            author,
            total_pages: totalPages ? parseInt(totalPages) : null,
            cover_url: coverUrl || null,
            status,
            rating: rating ? parseFloat(rating) : null,
        })

        if (data.error) {
            setError(data.error)
            setSaving(false)
            return
        }

        router.push("/dashboard")
    }

    if (loading) return <p className="text-center mt-10">Cargando...</p>

    return (
        <main className="max-w-lg mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
                    ← Volver
                </Link>
                <h1 className="text-2xl font-bold">Editar libro</h1>
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
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    <option value="pending">Pendiente</option>
                    <option value="reading">Leyendo</option>
                    <option value="finished">Terminado</option>
                </select>
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rating}
                    min="1"
                    max="5"
                    step="0.5"
                    onChange={(e) => setRating(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-indigo-500 text-white rounded-lg py-2 font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
                >
                    {saving ? "Guardando..." : "Guardar cambios"}
                </button>
            </form>
        </main>
    )
}

export default EditBookPage