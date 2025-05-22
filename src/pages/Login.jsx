import React, { useContext, useState } from "react";
import logo from "../assets/clicknext_logo.webp";
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        navigate("/deposit");
    };

    return (
        <div className="w-full flex items-center justify-center min-h-screen bg-[#FF002F] px-4">
            <div className="w-full max-w-md p-6 md:p-8 space-y-3 bg-white rounded-xl shadow-md">
                <div className="flex flex-col items-center justify-center mb-4">
                    <img src={logo} alt="Logo" className="w-32 md:w-1/2 mb-2" />
                    <p className="text-md text-gray-600 text-center">
                        โปรดเข้าสู่ระบบเพื่อทำการฝาก-ถอนเงิน
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                อีเมล
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="กรอกอีเมลของคุณ"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                รหัสผ่าน
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="กรอกรหัสผ่านของคุณ"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>
            </div>
        </div>
    );
}