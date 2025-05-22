import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem('isLoggedIn'))
  );

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('balance');
    return saved ? parseFloat(saved) : 1000000;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);


  const login = (email, password) => {
    setIsLoggedIn(true);
    const userData = { email, password };
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('transactions');
    localStorage.removeItem('balance');
    setTransactions([]);
    setBalance(1000000);
  };

  const addTransaction = (type, amount, email) => {
    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      email,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setBalance((prev) =>
      type === 'deposit' ? prev + newTransaction.amount : prev - newTransaction.amount
    );
  };

  const deleteTransaction = (id) => {
    const toDelete = transactions.find((t) => t.id === id);
    if (!toDelete) return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    setBalance((prev) =>
      toDelete.type === 'deposit' ? prev - toDelete.amount : prev + toDelete.amount
    );
  };

  const editTransaction = (id, newAmount) => {
    const old = transactions.find((t) => t.id === id);
    if (!old) return;

    const delta = parseFloat(newAmount) - old.amount;

    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, amount: parseFloat(newAmount) } : t
      )
    );

    setBalance((prev) =>
      old.type === 'deposit' ? prev + delta : prev - delta
    );
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      transactions,
      balance,
      addTransaction,
      deleteTransaction,
      editTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
