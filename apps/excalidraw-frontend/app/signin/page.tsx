"use client";
import { PencilRuler } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HTTP_BACKEND } from "@/config";
import {
    setSession,
    setToken,
    setUserId,
    setUsername,
} from "@repo/store/userSlice";
export default function SigninPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            try {
                const data = {
                    email: formData.email,
                    password: formData.password,
                };
                const response = await axios.post(`${HTTP_BACKEND}/signin`, data);
                if (response.status === 200) {
                    dispatch(setUsername(response.data.username));
                    dispatch(setUserId(response.data.userId));
                    dispatch(setToken(response.data.token));
                    dispatch(setSession(true));
                    localStorage.setItem("token", response.data.token);
                    toast.success("Logged in successfully");
                    router.push("/create-room");
                } else if (response.status === 403) {
                    toast.error("Invalid credentials");
                }
            } catch (error) {
                // TODO: Handle specific errors
                toast.error("Something went wrong, please try again");
            }
        }
    };
    return (
        <>
            <div className="bg-gradient-to-t from-yellow-900 to-white via-yellow-300 dark:from-zinc-950 dark:to-yellow-900">
                <div className="absolute top-50 right-50 p-4 cursor-pointer">
                    <PencilRuler
                        className="h-8 w-auto text-yellow-600 dark:text-yellow-400"
                        onClick={() => {
                            router.push("/");
                        }}
                    />
                </div>
                <div className="flex min-h-screen items-center justify-center">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-zinc-800">
                                Sign in to your account
                            </h1>
                            <p className="text-zinc-600 text-sm mt-2">
                                Don't have an account?{" "}
                                <span
                                    className="cursor-pointer underline"
                                    onClick={() => {
                                        router.push("/signup");
                                    }}
                                >
                                    Register
                                </span>
                            </p>
                        </div>
                        <form className="mt-6" onSubmit={login}>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-zinc-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 text-zinc-900 border border-zinc-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-zinc-700"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border text-zinc-900 border-zinc-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none sm:text-sm font-medium"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
