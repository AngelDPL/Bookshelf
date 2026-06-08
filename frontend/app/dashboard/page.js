"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { getBooks, deleteBook } from "@/services/api"
import Link from "next/link"

const statusConfig = {
    pending: { label: "Pendiente", color: "#f59e0b", bg: "#f59e0b20" },
    reading: { label: "Leyendo", color: "#6366f1", bg: "#6366f120" },
    finished: { label: "Terminado", color: "#10b981", bg: "#10b98120" },
}

const DashboardPage = () => {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    const { user } = useAuth()
    const router = useRouter()

    const handleDelete = async (id) => {
        await deleteBook(id)
        setBooks(books.filter((b) => b.id !== id))
    }

    useEffect(() => {
        if (!user) {
            router.push("/login")
            return
        }

        const fetchBooks = async () => {
            const data = await getBooks()
            setBooks(data)
            setLoading(false)
        }

        fetchBooks()
    }, [user, router])

    if (loading) return (
        <p style={{ color: "var(--text-secondary)" }}>Cargando...</p>
    )

    return (
        <div className="flex flex-col gap-8">

            <div>
                <h1 className="text-2xl font-bold text-white">Mi biblioteca</h1>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    Gestiona tus lecturas
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total", value: books.length, color: "var(--text-primary)" },
                    { label: "Leyendo", value: books.filter(b => b.status === "reading").length, color: "#6366f1" },
                    { label: "Terminados", value: books.filter(b => b.status === "finished").length, color: "#10b981" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl p-6"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    >
                        <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {books.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-5xl mb-4">📖</p>
                    <p className="text-lg font-medium text-white">Tu biblioteca está vacía</p>
                    <p className="text-sm mt-2 mb-6" style={{ color: "var(--text-secondary)" }}>
                        Añade tu primer libro para empezar
                    </p>
                    <Link
                        href="/dashboard/books/new"
                        className="rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-85"
                        style={{ background: "var(--accent)", padding: "12px 24px" }}
                    >
                        + Añadir libro
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {books.map((book, i) => (
                        <div
                            key={book.id}
                            className="rounded-2xl p-5 flex flex-col gap-3 animate-fadeIn transition-all duration-200"
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border)",
                                animationDelay: `${i * 50}ms`
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                        >
                            {book.cover_url && (
                                <img
                                    src={book.cover_url}
                                    alt={book.title}
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                            )}
                            <div>
                                <h2 className="font-semibold text-white">{book.title}</h2>
                                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{book.author}</p>
                            </div>
                            <span
                                className="text-xs font-medium rounded-full self-start"
                                style={{
                                    color: statusConfig[book.status]?.color,
                                    background: statusConfig[book.status]?.bg,
                                    padding: "4px 10px"
                                }}
                            >
                                {statusConfig[book.status]?.label}
                            </span>
                            {book.rating && (
                                <p className="text-sm" style={{ color: "#f59e0b" }}>
                                    {"★".repeat(Math.round(book.rating))} {book.rating}/5
                                </p>
                            )}
                            <div className="flex gap-3 mt-auto pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                                <Link
                                    href={`/dashboard/books/${book.id}`}
                                    className="text-sm font-medium transition-opacity hover:opacity-70"
                                    style={{ color: "var(--accent)" }}
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="text-sm font-medium transition-opacity hover:opacity-70"
                                    style={{ color: "var(--danger)" }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DashboardPage