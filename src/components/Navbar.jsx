import React, { useState } from 'react';
import logo from '../assets/clicknext_logo.webp';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { logout, user } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const email = user?.email || '';

    return (
        <nav className="w-full flex items-center justify-between bg-white p-4 shadow-md relative z-50">
            <div className="flex items-center gap-4">
                <img src={logo} className="w-32" alt="logo" />
            </div>

            <div className="hidden md:flex items-center gap-4">
                <p className="text-[#FF002F]">{email}</p>
                <button className="bg-amber-100 py-1 px-4 rounded" onClick={logout}>Logout</button>
            </div>

            <button
                className="md:hidden flex items-center text-[#FF002F] focus:outline-none"
                onClick={() => setIsMenuOpen(true)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 p-6 flex flex-col gap-6 ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center mb-6">
                    <p className="text-[#FF002F] font-bold">{email}</p>
                    <button onClick={() => setIsMenuOpen(false)} className="text-[#FF002F] text-xl">&times;</button>
                </div>
                <Link to="/deposit" className="text-[#FF002F] font-semibold" onClick={() => setIsMenuOpen(false)}>ฝาก / ถอน</Link>
                <Link to="/transactions" className="text-[#FF002F] font-semibold" onClick={() => setIsMenuOpen(false)}>ประวัติการทำรายการ</Link>
                <button className="bg-amber-100 py-2 px-4 rounded mt-auto" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>
            </div>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
