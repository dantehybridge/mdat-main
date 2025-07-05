import React, { useEffect, useState } from "react";
import Dialog from "../components/dialog";

export default function Head() {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("");

    useEffect(() => {
        const u = sessionStorage.getItem("u");
        if (u) setUsername(u);
    }, []);

    function handleDialogConfirm() {
        window.location.replace('/auth/logout');
    }

    return (
        <>
            <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow">
            <h1 className="text-xl font-semibold">Welcome, {username || "earthling"}</h1>
            <button
                onClick={() => setOpen(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
            >
                Logout
            </button>
            </header>

            <Dialog
                open={open}
                onConfirm={handleDialogConfirm}
                onDiscard={() => setOpen(false)}
            >
                <h2 className="text-2xl font-bold">Wait just a second...</h2>
                <p className="text-gray-700 text-lg">Are you <span className="font-semibold">sure</span> you want to log out?</p>
                <p className="text-gray-500 text-sm italic">You'll leave us hanging like a semicolon without a statement. 😢</p>
            </Dialog>
        </>
    );
}
