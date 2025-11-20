import React, { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus } from '../services/api';
import { Order } from '../types';
import { Loader2, RefreshCw, Lock, LogIn } from 'lucide-react';

// Simple Admin Gate Component
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pass === 'admin123') {
            onLogin();
        } else {
            setError('Invalid Password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white p-8 rounded-sm shadow-md w-full max-w-sm border border-gray-200">
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-50 p-4 rounded-full">
                        <Lock className="text-primary" size={32} />
                    </div>
                </div>
                <h2 className="text-center text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="password" 
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        placeholder="Enter Password (admin123)" 
                        className="w-full border border-gray-300 p-3 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button className="w-full bg-primary text-white py-3 font-bold rounded-sm hover:bg-blue-600">
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

const AdminScreen: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    const data = await fetchOrders();
    // Sort by date desc
    const sorted = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setOrders(sorted);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuth) {
        loadOrders();
    }
  }, [isAuth]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    } else {
      alert("Failed to update status");
    }
    setUpdating(null);
  };

  if (!isAuth) {
      return <AdminLogin onLogin={() => setIsAuth(true)} />;
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6 bg-white p-4 shadow-sm rounded-sm">
        <h1 className="text-xl font-bold text-gray-900">Seller Dashboard</h1>
        <div className="flex gap-2">
            <button 
                onClick={loadOrders} 
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-sm hover:bg-blue-100 font-bold text-sm transition-colors"
            >
                <RefreshCw size={16} /> Refresh Data
            </button>
            <button onClick={() => setIsAuth(false)} className="text-gray-500 font-bold text-sm px-4">Logout</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={40} className="animate-spin text-primary" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-sm shadow-sm">
          <p className="text-gray-500">No active orders found.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Items</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">#{order.id}</td>
                                <td className="px-6 py-4">{new Date(order.timestamp).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-800">{order.customerName}</div>
                                    <div className="text-xs">{order.customerPhone}</div>
                                    <div className="text-xs truncate max-w-[150px]" title={order.address}>{order.address}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-1 text-xs">
                                                <span className="font-bold text-gray-800">{item.quantity}x</span>
                                                <span>{item.name.substring(0, 20)}...</span>
                                                <span className="bg-gray-100 px-1 rounded">Size: {item.selectedSize}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold">₹{order.total}</td>
                                <td className="px-6 py-4">
                                    <select 
                                        disabled={updating === order.id}
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                        className={`text-xs font-bold py-1 px-2 rounded border cursor-pointer outline-none ${
                                            order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                                            order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            'bg-yellow-50 text-yellow-700 border-yellow-200'
                                        }`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    {updating === order.id && <span className="ml-2 text-xs text-gray-400">...</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminScreen;