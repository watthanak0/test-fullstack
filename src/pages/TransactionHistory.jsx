import React, { useState } from 'react';
import Menu from '../components/Menu';
import TransactionModal from '../components/TransactionModal';
import { useAppContext } from '../context/AppContext';

const TransactionHistory = () => {
  const {
    transactions,
    editTransaction,
    deleteTransaction,
    user,
  } = useAppContext();

  const [modalType, setModalType] = useState('edit');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  const openEditModal = (tx) => {
    setModalType('edit');
    setSelectedTransaction(tx);
    setEditAmount(tx.amount.toString());
  };

  const openDeleteModal = (tx) => {
    setModalType('delete');
    setSelectedTransaction(tx);
  };

  const handleConfirm = (newAmount) => {
    if (selectedTransaction) {
      editTransaction(selectedTransaction.id, parseFloat(newAmount));
      closeModal();
    }
  };

  const handleDelete = () => {
    if (selectedTransaction) {
      deleteTransaction(selectedTransaction.id);
      closeModal();
    }
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setEditAmount('');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-pink-50 w-full min-h-screen">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto pt-10 gap-6 px-4">
        <Menu />
        <div className="w-full md:w-[80%] flex flex-col min-h-[80vh] bg-white/90 p-8 rounded-2xl shadow-lg border border-blue-100">
          <h2 className="text-3xl font-extrabold mb-6 text-blue-700 tracking-wide">
            ประวัติการทำรายการ
          </h2>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-3">วันที่</th>
                  <th className="px-4 py-3">ประเภท</th>
                  <th className="px-4 py-3">จำนวนเงิน</th>
                  <th className="px-4 py-3 text-center">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      ไม่มีรายการ
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-blue-50 transition">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {tx.date} {tx.time}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                            tx.type === 'deposit'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        >
                          {tx.type === 'deposit' ? 'ฝาก' : 'ถอน'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-blue-800 font-semibold whitespace-nowrap">
                        {tx.amount.toLocaleString()} บาท
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => openEditModal(tx)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => openDeleteModal(tx)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={!!selectedTransaction}
        type={modalType}
        initialAmount={editAmount}
        onClose={closeModal}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        userEmail={selectedTransaction?.email || user?.email}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default TransactionHistory;
