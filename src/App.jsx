import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import TransactionHistory from './pages/TransactionHistory';
import DepositWithdraw from './pages/DepositWithdraw';
import Nav from './components/Navbar';
import { useAppContext } from './context/AppContext';

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {isLoggedIn && <Nav />}
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/deposit" /> : <Login />}
        />
        <Route
          path="/deposit"
          element={isLoggedIn ? <DepositWithdraw /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions"
          element={isLoggedIn ? <TransactionHistory /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? '/deposit' : '/login'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
