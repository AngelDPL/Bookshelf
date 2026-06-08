"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { getBooks, deleteBook } from "@/services/api"
import Link from "next/link"

const DashboardPage = () => {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    const { user, logout } = useAuth()
    const router = useRouter()

    const handleDelete = async (id) => {
        await deleteBook(id)
        setBooks(books.filter((b) => b.id !== id))
    }

    const handleLogout = () => {
        logout()
        router.push("/login")
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

    if (loading) return <p className="text-center mt-10">Cargando...</p>

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">📚 Mi biblioteca</h1>
                <div className="flex gap-3">
                    <span className="text-gray-500 text-sm self-center">Hola, {user?.username}</span>
                    <Link
                        href="/dashboard/books/new"
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition"
                    >
                        + Añadir libro
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-500 hover:text-red-500 transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {books.length === 0 ? (
                <p className="text-center text-gray-400 mt-20">No tienes libros todavía. ¡Añade uno!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
                            <h2 className="font-semibold text-lg">{book.title}</h2>
                            <p className="text-gray-500 text-sm">{book.author}</p>
                            <span className="text-xs bg-indigo-100 text-indigo-600 rounded-full px-2 py-1 self-start capitalize">
                                {book.status}
                            </span>
                            <div className="flex gap-2 mt-auto pt-2">
                                <Link
                                    href={`/dashboard/books/${book.id}`}
                                    className="text-sm text-indigo-500 hover:underline"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="text-sm text-red-400 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}

export default DashboardPage