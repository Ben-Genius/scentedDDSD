import React, { useEffect, useState } from 'react';
import { getProducts, getOrders } from '../lib/api';
import { Product, Order } from '../types';
import { formatMoney } from '../utils/formatMoney';
import { Edit2, Trash2, Plus, X, Save, Package, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';

export const AdminInventory = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'analytics'>('inventory');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            getProducts().then(setProducts);
            getOrders().then(setOrders);
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'changeme' || password === 'admin') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
    };

    // CRUD Operations
    const openCreateModal = () => {
        setEditingProduct({
            id: `prod - ${Date.now()} `,
            title: '',
            slug: '',
            category: 'watches',
            basePrice: 0,
            images: {
                default: '', gallery: [],
                colorVariants: []
            },
            variants: [],
            stock: 0,
            featured: false,
            scents: [],
            specs: {}
        });
        setIsCreating(true);
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct({ ...product });
        setIsCreating(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setIsCreating(false);
    };

    const saveProduct = () => {
        if (!editingProduct) return;

        if (isCreating) {
            setProducts([...products, editingProduct]);
        } else {
            setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
        }
        closeModal();
    };

    const deleteProduct = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const toggleFeatured = (id: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
    };

    const updateStock = (id: string, newStock: number) => {
        setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
    };

    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    // Analytics
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock < 5).length;

    // Filter products
    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-sm p-10 border border-gold/20 rounded-2xl max-w-md w-full shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-gold font-playfair text-3xl mb-2">Admin Access</h2>
                        <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 p-4 text-white mb-6 outline-none focus:border-gold rounded-lg transition-colors"
                    />
                    <button type="submit" className="w-full bg-gold text-black py-4 font-bold uppercase tracking-wider rounded-lg hover:bg-gold/90 transition-colors">
                        Enter Dashboard
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-playfair text-gold mb-1">Admin Dashboard</h1>
                            <p className="text-gray-400 text-sm">Manage your luxury inventory</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 border border-white/20 text-white text-sm uppercase tracking-wider hover:border-gold hover:text-gold transition-colors rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Analytics Cards */}
            {activeTab === 'analytics' && (
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <DollarSign className="w-8 h-8 text-gold" />
                            </div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Total Revenue</p>
                            <p className="text-3xl font-bold text-white">{formatMoney(totalRevenue)}</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <ShoppingBag className="w-8 h-8 text-blue-400" />
                            </div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Total Orders</p>
                            <p className="text-3xl font-bold text-white">{totalOrders}</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Package className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Total Products</p>
                            <p className="text-3xl font-bold text-white">{totalProducts}</p>
                        </div>

                        <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <TrendingUp className="w-8 h-8 text-red-400" />
                            </div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Low Stock Items</p>
                            <p className="text-3xl font-bold text-white">{lowStockProducts}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="border-b border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`pb - 4 px - 2 text - sm uppercase tracking - wider font - medium transition - colors relative ${activeTab === 'inventory' ? 'text-gold' : 'text-gray-500 hover:text-white'
                                } `}
                        >
                            Inventory
                            {activeTab === 'inventory' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`pb - 4 px - 2 text - sm uppercase tracking - wider font - medium transition - colors relative ${activeTab === 'orders' ? 'text-gold' : 'text-gray-500 hover:text-white'
                                } `}
                        >
                            Orders
                            {activeTab === 'orders' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`pb - 4 px - 2 text - sm uppercase tracking - wider font - medium transition - colors relative ${activeTab === 'analytics' ? 'text-gold' : 'text-gray-500 hover:text-white'
                                } `}
                        >
                            Analytics
                            {activeTab === 'analytics' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-8">
                {activeTab === 'inventory' && (
                    <div>
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-6">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg outline-none focus:border-gold transition-colors w-80"
                            />
                            <button
                                onClick={openCreateModal}
                                className="flex items-center gap-2 bg-gold text-black px-6 py-3 font-bold uppercase tracking-wider rounded-lg hover:bg-gold/90 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Product
                            </button>
                        </div>

                        {/* Products Table */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="p-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Product</th>
                                            <th className="p-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Category</th>
                                            <th className="p-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Price</th>
                                            <th className="p-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Stock</th>
                                            <th className="p-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Featured</th>
                                            <th className="p-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredProducts.map(p => (
                                            <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={p.images.default} className="w-12 h-12 rounded-lg object-cover bg-black" alt="" />
                                                        <span className="text-white font-medium">{p.title}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-gold text-xs uppercase tracking-wider">{p.category}</span>
                                                </td>
                                                <td className="p-4 text-white">{formatMoney(p.basePrice)}</td>
                                                <td className="p-4">
                                                    <input
                                                        type="number"
                                                        value={p.stock}
                                                        onChange={(e) => updateStock(p.id, parseInt(e.target.value) || 0)}
                                                        className={`w - 20 bg - black border px - 2 py - 1 rounded text - white outline - none focus: border - gold ${p.stock < 5 ? 'border-red-500' : 'border-white/10'
                                                            } `}
                                                    />
                                                    {p.stock < 5 && (
                                                        <span className="text-red-400 text-xs ml-2">Low</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => toggleFeatured(p.id)}
                                                        className={`w - 5 h - 5 rounded - full border - 2 transition - all ${p.featured ? 'bg-gold border-gold' : 'bg-transparent border-gray-600'
                                                            } `}
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => openEditModal(p)}
                                                            className="text-gold hover:text-gold/70 transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProduct(p.id)}
                                                            className="text-red-400 hover:text-red-300 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        {orders.length === 0 ? (
                            <div className="text-center py-20">
                                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No orders yet.</p>
                            </div>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-gold/30 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">Order #{order.id}</h3>
                                            <p className="text-gray-400 text-sm">{new Date(order.date).toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gold font-bold text-xl">{formatMoney(order.total)}</p>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                                className="mt-2 bg-black border border-white/20 text-white text-xs px-3 py-1 rounded outline-none focus:border-gold"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/5 pt-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-400 mb-1">Customer</p>
                                                <p className="text-white">{order.contact.name}</p>
                                                <p className="text-gray-400">{order.contact.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 mb-1">Payment</p>
                                                <p className="text-white capitalize">{order.paymentMethod}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Edit/Create Modal */}
            {isModalOpen && editingProduct && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-playfair text-gold">
                                {isCreating ? 'Create Product' : 'Edit Product'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Title</label>
                                <input
                                    type="text"
                                    value={editingProduct.title}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                                    className="w-full bg-black border border-white/20 p-3 text-white rounded-lg outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Category</label>
                                <select
                                    value={editingProduct.category}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                    className="w-full bg-black border border-white/20 p-3 text-white rounded-lg outline-none focus:border-gold"
                                >
                                    <option value="watches">Watches</option>
                                    <option value="jewelry">Jewelry</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Base Price (GHS)</label>
                                    <input
                                        type="number"
                                        value={editingProduct.basePrice}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-black border border-white/20 p-3 text-white rounded-lg outline-none focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Stock</label>
                                    <input
                                        type="number"
                                        value={editingProduct.stock}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-black border border-white/20 p-3 text-white rounded-lg outline-none focus:border-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Description</label>
                                <textarea
                                    value={editingProduct.description}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                    rows={4}
                                    className="w-full bg-black border border-white/20 p-3 text-white rounded-lg outline-none focus:border-gold resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={editingProduct.images.default}
                                    onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        images: { ...editingProduct.images, default: e.target.value }
                                    })}
                                    className="w-full bg-black border border-white/20 p-3 text-white rounded-lg outline-none focus:border-gold"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={editingProduct.featured}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                                    className="w-5 h-5"
                                />
                                <label htmlFor="featured" className="text-white">Mark as Featured</label>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-[#111] border-t border-white/10 p-6 flex gap-3">
                            <button
                                onClick={closeModal}
                                className="flex-1 bg-white/5 border border-white/20 text-white py-3 font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveProduct}
                                className="flex-1 flex items-center justify-center gap-2 bg-gold text-black py-3 font-bold uppercase tracking-wider rounded-lg hover:bg-gold/90 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                {isCreating ? 'Create' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};