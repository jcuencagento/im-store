"use client";
import Image from "next/image";
import { useState } from "react";
import { account, ID } from "./appwrite";
import Store from "@/components/Store";
import logo from '../../public/pixel_gif.gif';

const LoginPage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(true);
    const [pwdError, setPwdError] = useState(true);
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const login = async (email, password) => {
        account.createEmailPasswordSession(email, password)
            .then(async session => {
                setLoggedInUser(await account.get());
            })
            .catch(async error => {
                if (error.toString().includes('Creation of a session is prohibited when a session is active')) {
                    await account.deleteSession("current");
                    await account.createEmailPasswordSession(email, password);
                    setLoggedInUser(await account.get());
                } else {
                    console.error('Error creating session:', error);
                }
            });

    };

    const register = async () => {
        await account.create(ID.unique(), email, password, name);
        login(email, password);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const validatePassword = (pwd) => {
        if (pwd.length < 1 || pwd.length > 255) {
            setPwdError(true);
        } else {
            setPwdError(false);
        }
    };

    const logout = async () => {
        await account.deleteSession("current");
        setLoggedInUser(null);
    };

    if (loggedInUser) {
        return (
            <div className="flex flex-col min-h-screen m-auto gap-8 bg-slate-400 text-gray-900 font-bold">
                <div className="flex flex-col m-auto gap-4 w-full" >
                    <div className="flex justify-end gap-4 mt-8 w-full">
                        <p className="my-auto">Logged in as {loggedInUser?.name}</p>
                        <button type="button" className="bg-red-500 text-black font-semibold p-2 mr-12 rounded-xl transform-gpu duration-300 hover:bg-red-600" onClick={logout}>
                            Logout
                        </button>
                    </div>
                    <Image className="m-auto" alt="Logo" src={logo} />
                </div>
                <div className="flex-grow w-full">
                    <Store />
                </div>
                <footer className="flex">
                    <p className="text-black font-semibold m-auto my-4">
                        Javier Cuenca Gento - 2024
                    </p>
                </footer>
            </div>
        );
    }

    return (
        <div className="flex flex-col m-auto gap-8 bg-slate-400">
            <p className="p-8 text-2xl m-auto text-gray-900 font-bold">Not logged in</p>
            <form className="flex flex-col m-auto gap-4">
                <input
                    type="text"
                    placeholder="Name (optional)"
                    className="p-2 rounded-lg text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    autoComplete="username"
                    className="p-2 rounded-lg text-black"
                    value={email}
                    onChange={(e) => {
                        validateEmail(e.target.value);
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    className="p-2 rounded-lg text-black"
                    value={password}
                    onChange={(e) => {
                        validatePassword(e.target.value);
                        setPassword(e.target.value);
                    }}
                />
                <button
                    type="button"
                    className={emailError || pwdError ? "bg-green-200/80 text-gray-500 font-semibold p-2 rounded-xl" : "bg-green-300 text-black font-semibold p-2 rounded-xl transform-gpu duration-300 hover:bg-green-400"}
                    disabled={emailError || pwdError}
                    onClick={() => login(email, password)}>
                    Login
                </button>
                <button
                    type="button"
                    className={emailError || pwdError ? "bg-blue-200/80 text-gray-500 font-semibold p-2 rounded-xl" : "bg-blue-300 text-black font-semibold p-2 rounded-xl transform-gpu duration-300 hover:bg-blue-400"}
                    disabled={emailError || pwdError}
                    onClick={register}>
                    Register
                </button>
            </form>
            <div className="flex flex-row py-2 m-auto" >
                <h2 className="m-auto mb-4 justify-center text-slate-800 font-extrabold text-4xl">Im Store</h2>
                <Image className="m-auto justify-center" alt="Logo" src={logo} />
            </div>
            <div className="flex-grow w-full text-black">
                <Store />
            </div>
            <footer className="flex">
                <p className="text-black font-semibold m-auto my-4">
                    Javier Cuenca Gento - 2024
                </p>
            </footer>
        </div>
    );
};

export default LoginPage;