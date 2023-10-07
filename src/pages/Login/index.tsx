import { useEffect, useState } from "react"
import { api } from "../../services";
import { Alert, TextField } from "@mui/material";

export function Login() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [isLogin, setisLogin] = useState(false);
    const [error, setError] = useState(false);

    const [textoVisivel, setTextoVisivel] = useState(true);

    function showError() {
        const timer = setTimeout(() => {
            setTextoVisivel(false);
        }, 3000);

        return () => clearTimeout(timer);
    }

    function onSubmit(e: any) {
        e.preventDefault();
        console.log(user, password);
    }

    function onLogin() {
        api
            .post("/login", {
                username: user,
                password: password,
            })
            .then((response) => {
                console.log(response.data);
                setisLogin(true);
            })
            .catch((error) => {
                console.log(error.message);
                setError(true);
                showError();
            })
    }

    return (
        <>
            {
                isLogin && (
                    <Alert variant="filled" severity="success">
                        successfully logged in!
                    </Alert>
                )
            }

            {
                textoVisivel && (
                    error && (
                        <Alert variant="filled" severity="error">
                            error when logging in!
                        </Alert>
                    )
                )
            }

            <section className="flex justify-center">
                <div className="mt-20 text-center w-96 rounded-lg flex border-2 border-stone-50 flex-col gap-10 p-6 h-[600px] shadow-xl">
                    <h1 className="text-3xl font-bold">Welcome</h1>
                    <div className="bg-gray-950 rounded-full py-2">
                        <h2 className="font-bold text-xl text-white"><span className="text-cyan-700">BlueStorm</span> Pharmacy</h2>
                    </div>
                    <form
                        onSubmit={(e) => onSubmit(e)}
                        className="flex flex-col text-gray-500 gap-8"
                    >
                        <TextField
                            type="text"
                            required
                            id="standard-basic"
                            label="Username"
                            variant="standard"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />

                        <TextField
                            type="password"
                            required
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={() => onLogin()}
                            className="mt-20 bg-gradient-to-r from-cyan-700 to-blue-500 text-white font-bold py-3 px-2 rounded-lg hover:opacity-90 transition-opacity">
                            LOGIN
                        </button>
                    </form>

                    <p className="mt-10 font-light">Don’t have an account? <span className="font-bold cursor-pointer">Sign Up</span></p>
                </div>
            </section>
        </>
    )
}