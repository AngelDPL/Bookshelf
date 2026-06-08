const Button = ({ children, onClick, type = "button", loading = false, variant = "primary", fullWidth = false }) => {

    const variants = {
        primary: { background: "var(--accent)" },
        danger: { background: "var(--danger)" },
        ghost: { background: "transparent", border: "1px solid var(--border)" },
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`${fullWidth ? "w-full" : ""} px-4 py-3 rounded-xl font-semibold text-white transition-all duration-200`}
            style={loading ? { background: "var(--border)" } : variants[variant]}
            onMouseEnter={(e) => { if (!loading) e.target.style.opacity = "0.85" }}
            onMouseLeave={(e) => { if (!loading) e.target.style.opacity = "1" }}
        >
            {loading ? "Cargando..." : children}
        </button>
    )
}

export default Button