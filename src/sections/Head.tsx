import React, { useEffect, useState } from "react";

export default function Head() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const u = sessionStorage.getItem("u");
        if (u) setUsername(u);
    }, []);

    return (
        <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-xl font-semibold">Welcome, {username || "User"}</h1>
        <button
            onClick={() => {
            console.log("Logout clicked");
            // Redirect to Entra logout URL when ready
            }}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
        >
            Logout
        </button>
        </header>
    );
}
