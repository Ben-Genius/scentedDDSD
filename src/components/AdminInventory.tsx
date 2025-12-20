import React, { useEffect, useState, useMemo, ElementType } from 'react';
import { getOrders } from '../lib/api';
import { useInventory } from '../hooks/useInventory';
import { Product, Order } from '../types';
import { formatMoney } from '../utils/formatMoney';
import {
    Edit2, Trash2, Plus, X, ShoppingBag, DollarSign,
    Mail, Lock, Home, Monitor, ShoppingCart, Users,
    Activity, Bell, Settings, User,
    MapPin, Calendar, Search, Filter, ArrowUpRight, ArrowDownRight, Printer, ArrowLeft
} from 'lucide-react';
import { IMAGES } from '@/assets';
import { Link } from 'react-router-dom';

// --- Types ---
type ViewState = 'Dashboard' | 'Sales' | 'Products' | 'Customers' | 'Settings';

interface MetricCardProps {
    title: string;
    value: string | number;
    subtext: string;
    icon: ElementType;
    trend?: 'up' | 'down';
}

interface SidebarOptionProps {
    Icon: ElementType;
    title: string;
    selected: ViewState;
    setSelected: (view: ViewState) => void;
    open: boolean;
    notifs?: number;
}
// --- Sub-Components ---

const Logo = () => (
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-sm text-black font-playfair font-bold text-xl">
        S
    </div>
);

const SidebarOption = ({ Icon, title, selected, setSelected, open, notifs }: SidebarOptionProps) => {
    const isSelected = selected === title;
    return (
        <button
            onClick={() => setSelected(title as ViewState)}
            className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${isSelected
                ? "bg-yellow-50 text-yellow-900 shadow-sm border-l-2 border-yellow-500"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
        >
            <div className="grid h-full w-12 place-content-center">
                <Icon className={`h-4 w-4 ${isSelected ? "text-yellow-700" : ""}`} />
            </div>
            {open && (
                <span className={`text-sm font-medium transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
                    {title}
                </span>
            )}
            {notifs && open && (
                <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs text-black font-bold">
                    {notifs}
                </span>
            )}
        </button>
    );
};

const MetricCard = ({ title, value, subtext, icon: Icon, trend }: MetricCardProps) => (
    <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
                <Icon className="h-5 w-5 text-yellow-600" />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    <span>{trend === 'up' ? '+12%' : '-5%'}</span>
                </div>
            )}
        </div>
        <h3 className="font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtext}</p>
    </div>
);

const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-end z-50">
            <div className="bg-white h-full w-full max-w-2xl shadow-2xl overflow-y-auto transform transition-transform duration-300 animate-in slide-in-from-right">
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-bold font-playfair text-gray-900">Order #{order.id}</h2>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100" title="Print Invoice">
                            <Printer className="w-5 h-5" />
                        </button>
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-8">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                                <User className="w-4 h-4" /> Customer
                            </h3>
                            <p className="font-semibold text-gray-900">{order.contact.name}</p>
                            <a href={`mailto:${order.contact.email}`} className="text-sm text-blue-600 hover:underline block mt-1">{order.contact.email}</a>
                            <p className="text-sm text-gray-600 mt-1">{order.contact.phone}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Shipping
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {order.contact.address}<br />
                                {order.contact.city}
                            </p>
                            <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">Payment: <span className="capitalize font-medium text-gray-900">{order.paymentMethod}</span></p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-yellow-600" /> Order Items
                        </h3>
                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="px-4 py-3">Item</th>
                                        <th className="px-4 py-3 text-right">Price</th>
                                        <th className="px-4 py-3 text-center">Qty</th>
                                        <th className="px-4 py-3 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {order.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img src={item.image} alt={item.productTitle} className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.productTitle}</p>
                                                        <p className="text-xs text-gray-500">{item.variantLabel} {item.colorLabel && `• ${item.colorLabel}`}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-600">{formatMoney(item.price)}</td>
                                            <td className="px-4 py-3 text-center text-gray-600">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-900">{formatMoney(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50 font-medium text-gray-900">
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-right">Total</td>
                                        <td className="px-4 py-3 text-right text-lg">{formatMoney(order.total)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

export const AdminInventory = () => {
    // Inventory Data
    const { products, addProduct, updateProduct: updateInventoryProduct, deleteProduct: removeProduct } = useInventory();
    const [orders, setOrders] = useState<Order[]>([]);

    // Analytics (Memoized)
    const analytics = useMemo(() => {
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const totalProducts = products.length;
        const lowStockProducts = products.filter(p => p.stock < 5).length;

        // Simple mock trend data
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Customers Aggregation
        const customersMap = new Map();
        orders.forEach(order => {
            const email = order.contact.email;
            if (!customersMap.has(email)) {
                customersMap.set(email, {
                    id: email, // simple ID
                    name: order.contact.name,
                    email: email,
                    phone: order.contact.phone,
                    city: order.contact.city,
                    totalOrders: 0,
                    totalSpend: 0,
                    lastOrder: order.date
                });
            }
            const customer = customersMap.get(email);
            customer.totalOrders += 1;
            customer.totalSpend += order.total;
            if (new Date(order.date) > new Date(customer.lastOrder)) {
                customer.lastOrder = order.date;
            }
        });
        const distinctCustomers = Array.from(customersMap.values());

        return { totalRevenue, totalOrders, totalProducts, lowStockProducts, distinctCustomers, avgOrderValue };
    }, [orders, products]);

    // Auth State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Layout & View State
    const [sidebarOpen] = useState(true);
    const [selectedView, setSelectedView] = useState<ViewState>("Dashboard");
    const [searchQuery, setSearchQuery] = useState('');
    const [salesStatusFilter, setSalesStatusFilter] = useState('all');

    // Operations State
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // Order Detail State
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Initial Load
    useEffect(() => {
        if (isAuthenticated) {
            getOrders().then(setOrders);
        }
    }, [isAuthenticated]);

    // Force light mode
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    // Auth Handlers
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
        setEmail('');
    };

    // Product CRUD Handlers
    // const openCreateModal = () => { /* ... */ setIsCreating(true); setIsProductModalOpen(true); };
    // const openEditModal = (product: Product) => { /* ... */ setIsCreating(false); setIsProductModalOpen(true); };
    // For brevity, using inline in render where possible or re-defining:
    const openCreateModal = () => {
        setEditingProduct({
            id: `prod-${Date.now()}`,
            title: '', slug: '', category: 'watches', basePrice: 0,
            images: { default: '', gallery: [], colorVariants: [] },
            variants: [], stock: 0, featured: false, scents: [], specs: {}
        });
        setIsCreating(true);
        setIsProductModalOpen(true);
    };
    const openEditModal = (product: Product) => {
        setEditingProduct({ ...product });
        setIsCreating(false);
        setIsProductModalOpen(true);
    };
    const closeProductModal = () => { setIsProductModalOpen(false); setEditingProduct(null); setIsCreating(false); };
    const saveProduct = () => {
        if (!editingProduct) return;
        if (isCreating) addProduct(editingProduct);
        else updateInventoryProduct(editingProduct);
        closeProductModal();
    };
    const deleteProduct = (id: string) => { if (window.confirm('Are you sure?')) removeProduct(id); };
    const toggleFeatured = (id: string, current: boolean) => {
        const product = products.find(p => p.id === id);
        if (product) updateInventoryProduct({ ...product, featured: !current });
    };
    const updateStock = (id: string, newStock: number) => {
        const product = products.find(p => p.id === id);
        if (product) updateInventoryProduct({ ...product, stock: newStock });
    };

    // Order Handlers
    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    // Filter Logic
    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredOrders = orders.filter(o =>
        salesStatusFilter === 'all' || o.status === salesStatusFilter
    );

    // --- Render Login ---
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen w-full bg-champagne-100">
                <div className="w-full hidden md:block md:w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-champagne-100/10 z-10 mix-blend-overlay" />
                    <img className="h-full w-full object-cover" src={IMAGES.hero} alt="Admin Background" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-champagne-100 border-l border-black/5 relative">
                    {/* Back to Home Link */}
                    <div className="absolute top-8 left-8">
                        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Store
                        </Link>
                    </div>

                    <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col items-center justify-center">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl text-black font-playfair font-medium mb-2">Admin Portal</h2>
                            <p className="text-sm text-gray-500">Welcome back! Please sign in to continue</p>
                        </div>
                        <div className="w-full space-y-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block tracking-widest">Email Address</label>
                                <div className="flex items-center w-full bg-white border border-black/10 h-12 rounded-lg px-4 gap-3 focus-within:border-yellow-500 transition-colors shadow-sm">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent text-black placeholder-gray-400 outline-none text-sm w-full h-full" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block tracking-widest">Password</label>
                                <div className="flex items-center w-full bg-white border border-black/10 h-12 rounded-lg px-4 gap-3 focus-within:border-yellow-500 transition-colors shadow-sm">
                                    <Lock className="w-4 h-4 text-gray-400" />
                                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent text-black placeholder-gray-400 outline-none text-sm w-full h-full" />
                                </div>
                            </div>
                            <button type="submit" className="w-full h-12 rounded-lg text-white font-bold uppercase tracking-wider bg-black hover:bg-yellow-600 transition-colors shadow-lg mt-4">Login To Dashboard</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // --- Render Dashboard ---
    return (
        <div className="flex min-h-screen w-full bg-champagne-100/30">
            {/* Sidebar nav */}
            <nav className={`sticky top-0 h-screen shrink-0 border-r border-gray-100 bg-white p-2 shadow-sm transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-16'}`}>
                <div className="mb-6 border-b border-gray-100 pb-4">
                    <div className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <Logo />
                            {sidebarOpen && (
                                <div className="animate-in fade-in duration-300">
                                    <span className="block text-sm font-semibold text-gray-900 font-playfair">Scented & Co.</span>
                                    <span className="block text-xs text-gray-500">Admin Panel</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-1 mb-8">
                    <SidebarOption Icon={Home} title="Dashboard" selected={selectedView} setSelected={setSelectedView} open={sidebarOpen} />
                    <SidebarOption Icon={DollarSign} title="Sales" selected={selectedView} setSelected={setSelectedView} open={sidebarOpen} notifs={orders.filter(o => o.status === 'pending').length || undefined} />
                    <Link to="/"><SidebarOption Icon={Monitor} title="View Site" selected={selectedView} setSelected={() => { }} open={sidebarOpen} /></Link>
                    <SidebarOption Icon={ShoppingCart} title="Products" selected={selectedView} setSelected={setSelectedView} open={sidebarOpen} />
                    <SidebarOption Icon={Users} title="Customers" selected={selectedView} setSelected={setSelectedView} open={sidebarOpen} />
                </div>

                {sidebarOpen && (
                    <div className="border-t border-gray-100 pt-4 space-y-1">
                        <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">System</div>
                        <SidebarOption Icon={Settings} title="Settings" selected={selectedView} setSelected={setSelectedView} open={sidebarOpen} />
                        <div onClick={handleLogout}><SidebarOption Icon={User} title="Logout" selected={selectedView} setSelected={() => { }} open={sidebarOpen} /></div>
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-playfair text-gray-900">{selectedView}</h1>
                        <p className="text-gray-600 mt-1">
                            {selectedView === 'Dashboard' && "Overview of your store's performance."}
                            {selectedView === 'Sales' && "Manage orders and invoicing."}
                            {selectedView === 'Products' && "Manage inventory and catalog."}
                            {selectedView === 'Customers' && "View your customer base."}
                            {selectedView === 'Settings' && "Manage store configuration."}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Bell className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </div>
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">AD</div>
                            <span className="text-sm font-medium text-gray-700 hidden md:block">Administrator</span>
                        </div>
                    </div>
                </div>

                {/* VIEW: DASHBOARD */}
                {selectedView === 'Dashboard' && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <MetricCard title="Total Revenue" value={formatMoney(analytics.totalRevenue)} subtext="Lifetime volume" icon={DollarSign} trend="up" />
                            <MetricCard title="Orders" value={analytics.totalOrders} subtext="Total Processing" icon={ShoppingBag} />
                            <MetricCard title="Customers" value={analytics.distinctCustomers.length} subtext="Unique Buyers" icon={Users} trend="up" />
                            <MetricCard title="Avg. Order" value={formatMoney(analytics.avgOrderValue)} subtext="Per transaction" icon={Activity} />
                        </div>

                        {/* Analytic Charts - Merged Here */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-6 font-playfair">Revenue Trend</h3>
                                <div className="h-48 flex items-end justify-between gap-2">
                                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} className="w-full bg-champagne hover:bg-champagne-200 rounded-t transition-all relative group" style={{ height: `${h}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                                ${h * 100}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 text-xs text-gray-400 uppercase">
                                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-6 font-playfair">Sales by Category</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Scented Soap', val: 75, color: 'bg-champagne-300' },
                                        { label: 'Diffuser', val: 45, color: 'bg-gray-800' },
                                        { label: 'Room Spray', val: 30, color: 'bg-gray-400' },
                                        { label: 'Candle', val: 20, color: 'bg-blue-700' }
                                    ].map((cat, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-700 font-medium">{cat.label}</span>
                                                <span className="text-gray-500 font-bold">{cat.val}%</span>
                                            </div>
                                            <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                                                <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.val}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Low Stock Alert */}
                            <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 font-playfair">
                                    <Activity className="w-5 h-5 text-red-500" /> Low Stock Alerts
                                </h3>
                                <div className="space-y-3">
                                    {products.filter(p => p.stock < 5).slice(0, 5).map(p => (
                                        <div key={p.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                            <div className="flex items-center gap-3">
                                                <img src={p.images.default} className="w-10 h-10 rounded object-cover" />
                                                <div className="text-sm">
                                                    <p className="font-medium text-gray-900 truncate max-w-[120px]">{p.title}</p>
                                                    <p className="text-red-600 font-medium">{p.stock} remaining</p>
                                                </div>
                                            </div>
                                            <button onClick={() => { setSearchQuery(p.title); setSelectedView('Products'); }} className="text-xs bg-white border border-red-200 px-2 py-1 rounded hover:bg-red-50">Restock</button>
                                        </div>
                                    ))}
                                    {products.filter(p => p.stock < 5).length === 0 && (
                                        <p className="text-sm text-gray-500 text-center py-4">All stock levels are healthy.</p>
                                    )}
                                </div>
                            </div>

                            {/* Recent Activity Feed */}
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4 font-playfair">Recent Sales Activity</h3>
                                <div className="space-y-4">
                                    {orders.slice(0, 5).map(order => (
                                        <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">
                                                    {order.contact.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">New order from {order.contact.name}</p>
                                                    <p className="text-xs text-gray-500">{new Date(order.date).toLocaleTimeString()} • Order #{order.id}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">{formatMoney(order.total)}</p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{order.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {orders.length === 0 && <p className="text-gray-500 text-sm">No recent orders to show.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: PRODUCTS */}
                {selectedView === 'Products' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="relative w-80">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search inventory..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-gray-900 rounded-lg outline-none focus:border-yellow-500 focus:bg-white transition-all"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                                    <Filter className="w-4 h-4" /> Filter
                                </button>
                                <button onClick={openCreateModal} className="flex items-center gap-2 bg-black text-white px-6 py-2.5 font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-yellow-500 hover:text-black transition-colors shadow-lg shadow-black/5">
                                    <Plus className="w-4 h-4" /> Add Product
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-medium uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="p-4">Product</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Stock</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredProducts.map(p => (
                                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={p.images.default} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                                    <span className="font-medium text-gray-900">{p.title}</span>
                                                </div>
                                            </td>
                                            <td className="p-4"><span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs uppercase">{p.category}</span></td>
                                            <td className="p-4 font-medium">{formatMoney(p.basePrice)}</td>
                                            <td className="p-4">
                                                <input type="number" value={p.stock} onChange={(e) => updateStock(p.id, parseInt(e.target.value) || 0)} className="w-16 bg-gray-50 border border-gray-200 rounded px-2 py-1 text-center" />
                                            </td>
                                            <td className="p-4">
                                                <button onClick={() => toggleFeatured(p.id, p.featured)} className={`text-xs px-2 py-1 rounded-full border ${p.featured ? 'bg-yellow-100 border-yellow-200 text-yellow-800' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
                                                    {p.featured ? 'Featured' : 'Standard'}
                                                </button>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => openEditModal(p)} className="p-2 text-blue-600 bg-blue-50 rounded hover:bg-blue-100"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-600 bg-red-50 rounded hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* VIEW: SALES */}
                {selectedView === 'Sales' && (
                    <div className="space-y-6">
                        {/* Filters */}
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setSalesStatusFilter(status)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${salesStatusFilter === status
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* Orders List */}
                        <div className="grid gap-4">
                            {filteredOrders.map(order => (
                                <div key={order.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gray-100 rounded-lg">
                                                <ShoppingBag className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">Order #{order.id}</h3>
                                                <p className="text-gray-500 text-sm flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" /> {new Date(order.date).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold font-playfair text-gray-900">{formatMoney(order.total)}</p>
                                                <p className="text-xs text-gray-500">{order.items.length} items</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                                    className="bg-gray-50 border border-gray-200 text-xs font-medium uppercase px-3 py-2 rounded-lg outline-none cursor-pointer focus:border-yellow-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium text-center"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Quick Preview of items */}
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2 overflow-x-auto">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex-shrink-0 relative group" title={item.productTitle}>
                                                <img src={item.image} className="w-10 h-10 rounded-md object-cover border border-gray-100" />
                                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full border border-white">{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* VIEW: CUSTOMERS */}
                {selectedView === 'Customers' && (
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Contact</th>
                                        <th className="p-4">Location</th>
                                        <th className="p-4 text-center">Orders</th>
                                        <th className="p-4 text-right">Total Spend</th>
                                        <th className="p-4 text-right">Last Active</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {analytics.distinctCustomers.map((cust: { id: string; name: string; email: string; phone: string; city: string; totalOrders: number; totalSpend: number; lastOrder: string }) => (
                                        <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                        {cust.name.charAt(0)}
                                                    </div>
                                                    {cust.name}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span>{cust.email}</span>
                                                    <span className="text-xs text-gray-400">{cust.phone}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-600">{cust.city}</td>
                                            <td className="p-4 text-center font-medium bg-gray-50/50">{cust.totalOrders}</td>
                                            <td className="p-4 text-right font-bold text-gray-900">{formatMoney(cust.totalSpend)}</td>
                                            <td className="p-4 text-right text-gray-500 text-xs">{new Date(cust.lastOrder).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {analytics.distinctCustomers.length === 0 && (
                                <div className="p-8 text-center text-gray-500">No customer data available yet.</div>
                            )}
                        </div>
                    </div>
                )}

                {/* VIEW: SETTINGS */}
                {selectedView === 'Settings' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold font-playfair text-gray-900 mb-6">Store Configuration</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                                    <input type="text" defaultValue="Scented & Co." className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                                    <input type="email" defaultValue="support@scented.com" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white">
                                        <option>GHS (Ghana Cedi)</option>
                                        <option>USD (US Dollar)</option>
                                    </select>
                                </div>
                                <button className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-yellow-600 transition-colors">Save Changes</button>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold font-playfair text-gray-900 mb-6">Security</h2>
                            <div className="space-y-4">
                                <button className="w-full border border-gray-200 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                                    <Lock className="w-4 h-4" /> Change Admin Password
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Modal Layer */}
            {selectedOrder && (
                <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}

            {isProductModalOpen && editingProduct && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
                            <h2 className="text-2xl font-bold text-gray-900">{isCreating ? 'Create Product' : 'Edit Product'}</h2>
                            <button onClick={closeProductModal} className="text-gray-400 hover:text-gray-900"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Title</label>
                                <input type="text" value={editingProduct.title} onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })} className="w-full bg-gray-50 border border-gray-200 p-3 text-gray-900 rounded-lg outline-none focus:border-yellow-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-500 text-sm mb-2">Category</label>
                                    <select value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })} className="w-full bg-gray-50 border border-gray-200 p-3 text-gray-900 rounded-lg outline-none focus:border-yellow-500">
                                        <option value="diffusers">Diffusers</option>
                                        <option value="candles">Candles</option>
                                        <option value="soap">Scented Soaps</option>
                                        <option value="spray">Room Sprays</option>
                                        <option value="artifact">Artifact</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-sm mb-2">Base Price</label>
                                    <input type="number" value={editingProduct.basePrice} onChange={e => setEditingProduct({ ...editingProduct, basePrice: parseFloat(e.target.value) })} className="w-full bg-gray-50 border border-gray-200 p-3 text-gray-900 rounded-lg outline-none focus:border-yellow-500" />
                                </div>
                            </div>
                            <button onClick={saveProduct} className="w-full bg-black text-white py-3 font-bold rounded-lg hover:bg-yellow-600 transition-colors mt-4">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};