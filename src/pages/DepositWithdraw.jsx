import React, { useState } from 'react';
import Menu from '../components/Menu';
import TransactionModal from '../components/TransactionModal';
import { useAppContext } from '../context/AppContext';

const DepositWithdraw = () => {
  const { balance, addTransaction, user } = useAppContext();
  const [amount, setAmount] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setEditAmount(amount);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    let val = e.target.value.replace(/[^0-9.]/g, '');
    if (!val) return setAmount('');
    const num = parseFloat(val);
    if (isNaN(num)) return setAmount('');
    if (num < 0) return setAmount('0');
    if (num > 100000) return setAmount('100000');
    setAmount(val);
  };

  const handleConfirm = (confirmedAmount) => {
    const value = parseFloat(confirmedAmount);
    if (!isNaN(value) && value > 0) {
      addTransaction(modalType, value, user?.email || '');
      setAmount('');
      setModalOpen(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-pink-50 w-full min-h-screen py-10 px-4">
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-6">
        <Menu />
        <div className="flex-1 flex flex-col bg-white/90 p-8 rounded-3xl shadow-2xl border border-blue-100">
          <h2 className="text-3xl font-extrabold mb-6 text-blue-700 tracking-wide">
            ฝาก - ถอน
          </h2>
          <p className="mb-8 text-lg text-gray-700">
            คุณมียอดเงินคงเหลือในบัญชีจำนวน{' '}
            <span className="font-bold text-2xl text-green-500">
              {balance.toLocaleString()} บาท
            </span>
          </p>
          <div className="mb-6">
            <label htmlFor="amount" className="block text-base font-semibold text-gray-600 mb-2">
              จำนวนเงิน
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleChange}
              className="block w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              placeholder="กรอกจำนวนเงิน (สูงสุด 100,000)"
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-2">
            <button
              onClick={() => openModal('deposit')}
              className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow hover:from-green-500 hover:to-green-700 transition disabled:opacity-50"
              disabled={!amount || isNaN(parseFloat(amount))}
            >
              ฝาก
            </button>
            <button
              onClick={() => openModal('withdraw')}
              className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow hover:from-red-500 hover:to-red-700 transition disabled:opacity-50"
              disabled={
                !amount || isNaN(parseFloat(amount)) || parseFloat(amount) > balance
              }
            >
              ถอน
            </button>
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        type={modalType}
        initialAmount={editAmount}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        userEmail={user?.email || ''}
      />
    </div>
  );
};

export default DepositWithdraw;
