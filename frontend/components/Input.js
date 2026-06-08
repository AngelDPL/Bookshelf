const Input = ({ label, type = "text", value, onChange, placeholder, required }) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-200 bg-zinc-800 border border-zinc-700 focus:border-indigo-500 px-4 py-3"
            />
        </div>
    )
}

export default Input