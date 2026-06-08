const AuthCard = ({ children }) => {
    return (
        <div
            className="rounded-2xl"
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                padding: "32px"
            }}
        >
            {children}
        </div>
    )
}

export default AuthCard