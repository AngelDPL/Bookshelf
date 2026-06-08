const API_URL = "http://localhost:5000/api"

const getToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token")
    }
    return null
}

const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
})


// ── Auth ─────────────────────────────────────────────────────────────────────
export const registerUser = async (data) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export const loginUser = async (data) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export const getMe = async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
        headers: authHeaders(),
    })
    return res.json()
}


// ── Books ─────────────────────────────────────────────────────────────────────
export const getBooks = async () => {
    const res = await fetch(`${API_URL}/books/`, {
        headers: authHeaders(),
    })
    return res.json()
}

export const getBook = async (id) => {
    const res = await fetch(`${API_URL}/books/${id}`, {
        headers: authHeaders(),
    })
    return res.json()
}

export const createBook = async (data) => {
    const res = await fetch(`${API_URL}/books/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    })
    return res.json()
}

export const updateBook = async (id, data) => {
    const res = await fetch(`${API_URL}/books/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    })
    return res.json()
}

export const deleteBook = async (id) => {
    const res = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    })
    return res.json()
}


// ── Categories ────────────────────────────────────────────────────────────────
export const getCategories = async () => {
    const res = await fetch(`${API_URL}/categories/`, {
        headers: authHeaders(),
    })
    return res.json()
}

export const createCategory = async (data) => {
    const res = await fetch(`${API_URL}/categories/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    })
    return res.json()
}