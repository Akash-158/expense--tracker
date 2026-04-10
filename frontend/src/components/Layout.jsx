import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, DollarSign, LogOut } from 'lucide-react';

const Layout = ({ children, logout, user }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="w-64 bg-white shadow-md rounded-r-2xl hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Expenso 💸</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/') ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'}`}>
            <LayoutDashboard size={20} /> <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/expenses" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/expenses') ? 'bg-blue-50 text-orange-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500'}`}>
            <Receipt size={20} /> <span className="font-medium">Expenses</span>
          </Link>
          <Link to="/incomes" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/incomes') ? 'bg-blue-50 text-green-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-green-500'}`}>
            <DollarSign size={20} /> <span className="font-medium">Incomes</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between px-2 mb-4 text-sm font-medium text-gray-700">
            <span className="truncate">{user?.name}</span>
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Expenso 💸</h1>
          <button onClick={logout} className="text-red-500">
            <LogOut size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
        
        {/* Mobile Nav */}
        <nav className="md:hidden bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center pb-safe">
          <Link to="/" className={`flex flex-col items-center p-2 rounded-lg ${isActive('/') ? 'text-blue-600' : 'text-gray-500'}`}>
            <LayoutDashboard size={20} /> <span className="text-xs mt-1 font-medium">Home</span>
          </Link>
          <Link to="/expenses" className={`flex flex-col items-center p-2 rounded-lg ${isActive('/expenses') ? 'text-orange-600' : 'text-gray-500'}`}>
            <Receipt size={20} /> <span className="text-xs mt-1 font-medium">Expenses</span>
          </Link>
          <Link to="/incomes" className={`flex flex-col items-center p-2 rounded-lg ${isActive('/incomes') ? 'text-green-600' : 'text-gray-500'}`}>
            <DollarSign size={20} /> <span className="text-xs mt-1 font-medium">Incomes</span>
          </Link>
        </nav>
      </main>
    </div>
  );
};
export default Layout;
