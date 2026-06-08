"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

const Sidebar = () => {

    const { user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    const navItems = [
        { href: "/dashboard", label: "Mi biblioteca", icon: "📚" },
        { href: "/dashboard/books/new", label: "Añadir libro", icon: "➕" },
    ]

    return (
        <aside
            className="fixed top-0 left-0 h-screen w-64 flex flex-col"
            style={{
                background: "var(--bg-secondary)",
                borderRight: "1px solid var(--border)",
            }}
        >

            <div className="flex items-center gap-3 px-6 py-6" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="text-2xl">📚</span>
                <div>
                    <p className="font-bold text-white text-lg leading-none">BookShelf</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                        {user?.username}
                    </p>
                </div>
            </div>

            <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200"
                            style={{
                                padding: "10px 14px",
                                background: isActive ? "var(--accent)" : "transparent",
                                color: isActive ? "white" : "var(--text-secondary)",
                            }}
                            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--bg-card)" }}
                            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent" }}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="px-3 py-4" style={{ borderTop: "1px solid var(--border)" }}>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ padding: "10px 14px", color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ef444420"
                        e.currentTarget.style.color = "var(--danger)"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.color = "var(--text-secondary)"
                    }}
                >
                    <span>🚪</span>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    )
}

export default Sidebar