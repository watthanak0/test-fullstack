import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'ฝาก / ถอน', path: '/deposit' },
    { label: 'ประวัติการทำรายการ', path: '/transactions' },
  ];

  return (
    <nav className="bg-white p-6 shadow-lg w-full lg:w-64 lg:block hidden rounded-2xl border border-gray-100">
      <h4 className="text-2xl font-bold mb-6 text-red-600">เมนู</h4>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer text-lg font-semibold px-4 py-2 rounded-md transition-all ${
              location.pathname === item.path
                ? 'bg-[#FF002F] text-white'
                : 'text-[#FF002F] hover:bg-[#ff002fb8] hover:text-white'
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
