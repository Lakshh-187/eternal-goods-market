
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Package, Target, TrendingUp, ShoppingCart, AlertTriangle, Eye, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface DashboardStats {
  totalProducts: number;
  activeOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingReturns: number;
  lowStockProducts: number;
  abandonedCarts: number;
  newsletterSubscribers: number;
  recentOrders: any[];
  revenueData: any[];
  topProducts: any[];
  orderStatusData: any[];
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingReturns: 0,
    lowStockProducts: 0,
    abandonedCarts: 0,
    newsletterSubscribers: 0,
    recentOrders: [],
    revenueData: [],
    topProducts: [],
    orderStatusData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load basic stats
      const [
        productsResult,
        ordersResult,
        customersResult,
        returnsResult,
        cartsResult,
        subscribersResult
      ] = await Promise.all([
        supabase.from('products').select('id, stock').eq('status', 'active'),
        supabase.from('orders').select('id, total_amount, status, created_at').order('created_at', { ascending: false }),
        supabase.from('customers').select('id'),
        supabase.from('return_requests').select('id').eq('status', 'pending'),
        supabase.from('abandoned_carts').select('id, total_amount').is('recovered_at', null),
        supabase.from('newsletter_subscribers').select('id').eq('is_active', true)
      ]);

      const products = productsResult.data || [];
      const orders = ordersResult.data || [];
      const customers = customersResult.data || [];
      const returns = returnsResult.data || [];
      const carts = cartsResult.data || [];
      const subscribers = subscribersResult.data || [];

      // Calculate revenue
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

      // Get low stock products (stock < 10)
      const lowStockProducts = products.filter(p => p.stock < 10).length;

      // Get recent orders (last 10)
      const recentOrders = orders.slice(0, 10);

      // Generate revenue data for chart (last 7 days)
      const revenueData = generateRevenueChart(orders);

      // Get top products
      const topProducts = await getTopProducts();

      // Get order status breakdown
      const orderStatusData = getOrderStatusData(orders);

      setStats({
        totalProducts: products.length,
        activeOrders: orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status)).length,
        totalCustomers: customers.length,
        totalRevenue,
        pendingReturns: returns.length,
        lowStockProducts,
        abandonedCarts: carts.length,
        newsletterSubscribers: subscribers.length,
        recentOrders,
        revenueData,
        topProducts,
        orderStatusData
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const generateRevenueChart = (orders: any[]) => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate.toDateString() === date.toDateString();
      });
      const dayRevenue = dayOrders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: dayRevenue,
        orders: dayOrders.length
      });
    }
    return last7Days;
  };

  const getTopProducts = async () => {
    try {
      const { data } = await supabase
        .from('order_items')
        .select(`
          quantity,
          product_id,
          products(name, price)
        `)
        .limit(100);

      if (!data) return [];

      const productSales = data.reduce((acc: any, item: any) => {
        const productId = item.product_id;
        if (!acc[productId]) {
          acc[productId] = {
            id: productId,
            name: item.products?.name || 'Unknown',
            price: item.products?.price || 0,
            totalSold: 0,
            revenue: 0
          };
        }
        acc[productId].totalSold += item.quantity;
        acc[productId].revenue += item.quantity * parseFloat(item.products?.price || 0);
        return acc;
      }, {});

      return Object.values(productSales)
        .sort((a: any, b: any) => b.totalSold - a.totalSold)
        .slice(0, 5);
    } catch (error) {
      console.error('Error getting top products:', error);
      return [];
    }
  };

  const getOrderStatusData = (orders: any[]) => {
    const statusCounts = orders.reduce((acc: any, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCounts).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      color: getStatusColor(status)
    }));
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const statsCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders,
      icon: Target,
      color: 'bg-green-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Pending Returns',
      value: stats.pendingReturns,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-3%',
      changeType: 'negative'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockProducts,
      icon: Package,
      color: 'bg-yellow-500',
      change: '+2',
      changeType: 'neutral'
    },
    {
      title: 'Abandoned Carts',
      value: stats.abandonedCarts,
      icon: ShoppingCart,
      color: 'bg-gray-500',
      change: '-5%',
      changeType: 'positive'
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.newsletterSubscribers,
      icon: Heart,
      color: 'bg-pink-500',
      change: '+18%',
      changeType: 'positive'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
            <CardDescription>Daily revenue and order count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Current order status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ status, count }) => `${status}: ${count}`}
                >
                  {stats.orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{parseFloat(order.total_amount).toFixed(2)}</p>
                    <Badge variant={
                      order.status === 'delivered' ? 'default' :
                      order.status === 'pending' ? 'secondary' :
                      order.status === 'processing' ? 'outline' : 'destructive'
                    }>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topProducts.map((product: any, index: number) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.totalSold} sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{product.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common admin tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Package className="h-5 w-5" />
              Add Product
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Target className="h-5 w-5" />
              View Orders
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
