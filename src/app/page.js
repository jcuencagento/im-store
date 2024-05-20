"use client";
import Image from "next/image";
import { useState } from "react";
import { account, ID } from "./appwrite";
import Store from "@/components/Store";
import logo from '../../public/pixel_gif.gif';

const LoginPage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const login = async (email, password) => {
        console.log(account);
        console.log(account.get());
        const session = await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
    };

    const register = async () => {
        await account.create(ID.unique(), email, password, name);
        login(email, password);
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
            </div>
        );
    }

    return (
        <div className="flex flex-col m-auto gap-8 bg-slate-400">
            <Image className="py-6 m-auto" alt="Logo" src={logo} />
            <p className="p-8 text-2xl m-auto text-gray-900 font-bold">Not logged in</p>
            <form className="flex flex-col m-auto gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="p-2 rounded-lg text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 rounded-lg text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 rounded-lg text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="bg-green-300 text-black font-semibold p-2 rounded-xl transform-gpu duration-300 hover:bg-green-400" onClick={() => login(email, password)}>
                    Login
                </button>
                <button type="button" className="bg-blue-300 text-black font-semibold p-2 rounded-xl transform-gpu duration-300 hover:bg-blue-400" onClick={register}>
                    Register
                </button>
                <button type="button" className="bg-red-500 text-black font-semibold p-2 rounded-xl transform-gpu duration-300 hover:bg-red-600" onClick={logout}>
                    Logout
                </button>
            </form>
        </div>
    );
};

export default LoginPage;