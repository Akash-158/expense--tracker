import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';

const Expense = () => {
  const { token } = useOutletContext();
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/expenses`, { headers: { Authorization: `Bearer ${token}` } });
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchExpenses(); }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/expenses`, { ...form, amount: Number(form.amount) }, { headers: { Authorization: `Bearer ${token}` } });
      setForm({ description: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] });
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/expenses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setExpenses(expenses.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Expenses</h2>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
           <input required type="text" placeholder="Description" className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
           <input required type="number" placeholder="Amount" className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
           <select className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
             {['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
           </select>
           <input required type="date" className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
           <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center font-medium gap-2"><Plus size={18}/> Add</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {loading ? <div className="p-8 text-center text-gray-500">Loading...</div> : 
         expenses.length === 0 ? <div className="p-8 text-center text-gray-400">No expenses yet.</div> : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map(expense => (
                <tr key={expense._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">{expense.category}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">${expense.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(expense._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Expense;
