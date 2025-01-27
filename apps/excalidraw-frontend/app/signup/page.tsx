"use client";
import { PencilRuler } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.username && formData.email && formData.password) {
            try {
                const data = {
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                };
                const response = await axios.post("/signup", data);
                toast.success("Registered successfully");
                router.push("/signin");
            } catch (error) {
                // TODO: Handle specific errors
                toast.error("Something went wrong");
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="bg-gradient-to-t from-yellow-900 to-white via-yellow-300 dark:from-zinc-950 dark:to-yellow-900">
                <div className="absolute top-50 right-50 p-4 cursor-pointer">
                    <PencilRuler
                        className="h-8 w-auto text-yellow-600 dark:text-yellow-400"
                        onClick={() => router.push("/")}
                    />
                </div>
                <div className="flex min-h-screen items-center justify-center bg-inherit">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-zinc-800">
                                Register your account
                            </h1>
                            <p className="text-zinc-600 text-sm mt-2">
                                Already have an account?{" "}
                                <span
                                    className="underline cursor-pointer"
                                    onClick={() => {
                                        router.push("/signin");
                                    }}
                                >
                                    Login
                                </span>
                            </p>
                        </div>
                        <form className="mt-6" onSubmit={register}>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-md font-medium text-zinc-700"
                                >
                                    Enter your name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 text-zinc-800 border border-zinc-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                    placeholder="Harkirat Singh"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-md font-medium text-zinc-700"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 text-zinc-800 border border-zinc-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                    placeholder="harkiratsingh@gmail.com"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-md font-medium text-zinc-700"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 text-zinc-800 border border-zinc-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none sm:text-sm font-medium"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
