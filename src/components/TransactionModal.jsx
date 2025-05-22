import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const TransactionModal = ({
  isOpen,
  type = 'deposit', // 'deposit', 'withdraw', 'edit', 'delete'
  initialAmount = '',
  onClose,
  onConfirm,
  onDelete,
  transaction = null,
}) => {
  const { user } = useAppContext();
  const [amount, setAmount] = useState(initialAmount);

  useEffect(() => {
    if (isOpen) {
      setAmount(initialAmount);
    }
  }, [isOpen, initialAmount]);

  const handleChange = (e) => {
    let val = e.target.value.replace(/[^0-9.]/g, '');
    if (val === '') return setAmount('');
    let num = parseFloat(val);
    if (isNaN(num)) return setAmount('');
    if (num < 0) val = '0';
    if (num > 100000) val = '100000';
    setAmount(val);
  };

  const handleConfirm = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      onConfirm(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md space-y-5">
        <h3 className="text-xl font-bold text-gray-700">
          {type === 'deposit' || type === 'withdraw'
            ? 'ยืนยันการฝาก-ถอน'
            : type === 'delete'
              ? 'ยืนยันการลบ'
              : 'แก้ไขจำนวนเงินฝาก-ถอน'}
        </h3>

        {(type === 'deposit' || type === 'withdraw') ? (
          <p className="text-gray-600">จำนวนเงิน {amount} บาท</p>
        ) : type === 'delete' ? (
          <p className="text-gray-600">
            {transaction && (
              <>
                <span>คุณต้องการลบรายการ{transaction.type === 'withdraw' ? 'ถอน' : 'ฝาก'}เงิน จำนวน {transaction.amount} บาท ของวันที่ {transaction.date} จากบัญชี {transaction.email} หรือไม่</span>
              </>
            )}
          </p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              {transaction ? (
                <>
                  คุณต้องการแก้ไขจำนวนเงิน{transaction.type === 'withdraw' ? 'ถอน' : 'ฝาก'}ของวันที่ {transaction.date} <br />
                  จากบัญชี {transaction.email}
                </>
              ) : (
                <>คุณต้องการแก้ไขจำนวนเงิน{type === 'withdraw' ? 'ถอน' : 'ฝาก'} จากบัญชี {user?.email}</>
              )}
              <br />
            </p>
            <input
              type="text"
              id="amount"
              value={amount}
              min={0}
              max={100000}
              onChange={handleChange}
              className="block w-full p-3 border-2 rounded-md"
              placeholder="กรอกจำนวนเงิน (สูงสุด 100,000)"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            ยกเลิก
          </button>
          {type !== 'delete' && (
            <button
              onClick={handleConfirm}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              ยืนยัน
            </button>
          )}
          {type === 'delete' && (
            <button
              onClick={onDelete}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"
            >
              ลบรายการ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
