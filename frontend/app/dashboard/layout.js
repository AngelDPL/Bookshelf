import Sidebar from "@/components/Sidebar"

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
            <Sidebar />
            <main className="flex-1" style={{ marginLeft: "256px", padding: "32px" }}>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout