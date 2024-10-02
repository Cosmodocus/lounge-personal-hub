import MainLayout from "layouts/MainLayout";
import { ReactNode, useState } from "react";

const HomePage = () => {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    fullname: fullname,
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setResponseMessage(data.message || "Registration successful!");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Register User</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>

            {/* Display response or error */}
            {responseMessage && <p>{responseMessage}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

HomePage.getLayout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);

export default HomePage;
