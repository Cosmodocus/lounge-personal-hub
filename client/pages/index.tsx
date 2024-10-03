import MainLayout from "layouts/MainLayout";
import { ReactNode, useState } from "react";

// Define the shape of the user object
interface UserDetails {
    username: string;
    fullname: string;
    email: string;
    created: string;  // assuming it's a string format of datetime
}

const HomePage = () => {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // Define type for userDetails
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
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error: ${response.status}`);
            }

            const data = await response.json();
            setResponseMessage(data.message);  // Store the success message
            setUserDetails(data.user);  // Store the user details

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

            {/* Display response message or error */}
            {responseMessage && <p>{responseMessage}</p>}
            {error && <p>Error: {error}</p>}

            {/* Optionally display the user details */}
            {userDetails && (
                <div>
                    <h2>User Details:</h2>
                    <p>Username: {userDetails.username}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Full Name: {userDetails.fullname}</p>
                    <p>Created At: {new Date(userDetails.created).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

HomePage.getLayout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);

export default HomePage;
