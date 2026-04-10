import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';

const Income = () => {
  const { token } = useOutletContext();
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', category: 'Salary', date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(true);

  const fetchIncomes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/incomes`, { headers: { Authorization: `Bearer ${token}` } });
      setIncomes(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchIncomes(); }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/incomes`, { ...form, amount: Number(form.amount) }, { headers: { Authorization: `Bearer ${token}` } });
      setForm({ description: '', amount: '', category: 'Salary', date: new Date().toISOString().split('T')[0] });
      fetchIncomes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/incomes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setIncomes(incomes.filter(i => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Incomes</h2>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
           <input required type="text" placeholder="Description" className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
           <input required type="number" placeholder="Amount" className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
           <select className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
             {['Salary', 'Investment', 'Gift', 'Freelance', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
           </select>
           <input required type="date" className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
           <button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center font-medium gap-2"><Plus size={18}/> Add</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {loading ? <div className="p-8 text-center text-gray-500">Loading...</div> : 
         incomes.length === 0 ? <div className="p-8 text-center text-gray-400">No incomes yet.</div> : (
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
              {incomes.map(income => (
                <tr key={income._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(income.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{income.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">{income.category}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">${income.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(income._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button>
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
export default Income;
