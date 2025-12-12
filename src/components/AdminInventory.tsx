import React, { useEffect, useState } from 'react';
import { getProducts, getOrders } from '../lib/api';
import { Product, Order } from '../types';
import { formatMoney } from '../utils/formatMoney';

export const AdminInventory = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            getProducts().then(setProducts);
            getOrders().then(setOrders);
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock auth - simplistic
        if (password === 'changeme' || password === 'admin') { // Matches .env.example suggestion
            setIsAuthenticated(true);
        } else {
            alert('Invalid password');
        }
    };

    // Mock update - in a real app this would write to DB
    const toggleFeatured = (id: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
    };

    const updateStock = (id: string, newStock: number) => {
        setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <form onSubmit={handleLogin} className="bg-white/5 p-8 border border-gold/20 rounded max-w-sm w-full">
                    <h2 className="text-gold font-playfair text-2xl mb-6 text-center">Admin Access</h2>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black border border-white/20 p-3 text-white mb-4 outline-none focus:border-gold"
                    />
                    <button type="submit" className="w-full bg-gold text-black py-3 font-bold uppercase">Enter</button>
                </form>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-playfair text-white">Dashboard</h1>
                <div className="flex gap-4">
                    <button onClick={() => setActiveTab('inventory')} className={`text-sm uppercase ${activeTab === 'inventory' ? 'text-gold underline' : 'text-gray-500'}`}>Inventory</button>
                    <button onClick={() => setActiveTab('orders')} className={`text-sm uppercase ${activeTab === 'orders' ? 'text-gold underline' : 'text-gray-500'}`}>Orders</button>
                </div>
            </div>

            {activeTab === 'inventory' && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400 text-sm">
                        <thead className="text-white border-b border-white/10">
                            <tr>
                                <th className="p-3">Product</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Featured</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map(p => (
                                <tr key={p.id} className="hover:bg-white/5">
                                    <td className="p-3 flex items-center gap-3">
                                        <img src={p.images.default} className="w-8 h-8 rounded bg-black" alt="" />
                                        {p.title}
                                    </td>
                                    <td className="p-3">{formatMoney(p.basePrice)}</td>
                                    <td className="p-3">
                                        <input
                                            type="number"
                                            value={p.stock}
                                            onChange={(e) => updateStock(p.id, parseInt(e.target.value))}
                                            className="w-16 bg-black border border-white/10 px-1"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => toggleFeatured(p.id)}
                                            className={`w-4 h-4 rounded-full ${p.featured ? 'bg-gold' : 'bg-gray-700'}`}
                                        />
                                    </td>
                                    <td className="p-3 text-gold cursor-pointer">Edit</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="space-y-4">
                    {orders.length === 0 ? <p className="text-gray-500">No orders yet.</p> : (
                        orders.map(order => (
                            <div key={order.id} className="bg-white/5 p-4 border border-white/5 rounded">
                                <div className="flex justify-between text-white font-medium mb-2">
                                    <span>Order #{order.id}</span>
                                    <span>{formatMoney(order.total)}</span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    <p>{new Date(order.date).toLocaleString()}</p>
                                    <p>{order.contact.name} ({order.contact.email})</p>
                                    <p>{order.status} • {order.paymentMethod}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
