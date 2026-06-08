"use client"

import Link from "next/link"
import Logo from "@/components/Logo"

const HomePage = () => {
    return (
        <main
            className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
            style={{ background: "radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f0f 70%)" }}
        >
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "var(--accent)" }}
            />

            <div className="relative z-10 text-center animate-fadeIn flex flex-col items-center gap-8 max-w-lg">

                <Logo />

                <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Organiza tu lectura, lleva el control de tus libros y descubre cuánto has leído.
                </p>

                <div className="flex gap-4">
                <Link
                    href="/register"
                    className="rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-85 inline-flex items-center"
                    style={{ background: "var(--accent)", padding: "12px 32px" }}
                >
                    Empezar gratis
                </Link>
                <Link
                    href="/login"
                    className="rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-85 border border-zinc-500 inline-flex items-center"
                    style={{ padding: "12px 32px" }}
                >
                    Iniciar sesión
                </Link>
            </div>

                <div className="flex gap-8 mt-4">
                    {[
                        { label: "Libros registrados", value: "∞" },
                        { label: "Estados de lectura", value: "3" },
                        { label: "100% gratis", value: "✓" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default HomePage