import React, { useEffect, useState } from "react";

export default function Home() {
    const [aToken, setAToken] = useState("");
    const [iToken, setIToken] = useState("");

    useEffect(() => {
        const a = sessionStorage.getItem("a");
        const i = sessionStorage.getItem("i");
        if (a) setAToken(a);
        if (i) setIToken(i);
    }, []);

    return (
        <div className="bg-white rounded shadow p-6 space-y-4">
        <div>
            <h2 className="font-semibold text-lg">Access Token</h2>
            <p className="break-words text-sm text-gray-700 bg-gray-50 p-2 rounded">
            {aToken || "No access token found"}
            </p>
        </div>
        <div>
            <h2 className="font-semibold text-lg">ID Token</h2>
            <p className="break-words text-sm text-gray-700 bg-gray-50 p-2 rounded">
            {iToken || "No ID token found"}
            </p>
        </div>
        </div>
    );
}
