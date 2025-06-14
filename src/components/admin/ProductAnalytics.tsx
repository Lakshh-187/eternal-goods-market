
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Eye, ShoppingCart, CreditCard, RotateCcw, Download, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnalyticsData {
  product_name: string;
  product_id: string;
  views: number;
  cart_additions: number;
  purchases: number;
  returns: number;
  conversion_rate: number;
}

interface EventData {
  date: string;
  views: number;
  cart_additions: number;
  purchases: number;
  returns: number;
}

const ProductAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('7');
  const [productFilter, setProductFilter] = useState('all');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
    loadProducts();
  }, [dateFilter, productFilter]);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name')
        .eq('status', 'active')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      const daysBack = parseInt(dateFilter);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);

      let query = supabase
        .from('product_analytics')
        .select(`
          product_id,
          event_type,
          created_at,
          products!inner(name)
        `)
        .gte('created_at', startDate.toISOString());

      if (productFilter !== 'all') {
        query = query.eq('product_id', productFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Process analytics data
      const productStats = new Map<string, AnalyticsData>();
      const dailyEvents = new Map<string, EventData>();

      data?.forEach((event: any) => {
        const productId = event.product_id;
        const productName = event.products.name;
        const eventType = event.event_type;
        const eventDate = new Date(event.created_at).toLocaleDateString();

        // Product-level analytics
        if (!productStats.has(productId)) {
          productStats.set(productId, {
            product_id: productId,
            product_name: productName,
            views: 0,
            cart_additions: 0,
            purchases: 0,
            returns: 0,
            conversion_rate: 0
          });
        }

        const stats = productStats.get(productId)!;
        switch (eventType) {
          case 'view':
            stats.views++;
            break;
          case 'add_to_cart':
            stats.cart_additions++;
            break;
          case 'purchase':
            stats.purchases++;
            break;
          case 'return':
            stats.returns++;
            break;
        }

        // Daily events for charts
        if (!dailyEvents.has(eventDate)) {
          dailyEvents.set(eventDate, {
            date: eventDate,
            views: 0,
            cart_additions: 0,
            purchases: 0,
            returns: 0
          });
        }

        const dayStats = dailyEvents.get(eventDate)!;
        switch (eventType) {
          case 'view':
            dayStats.views++;
            break;
          case 'add_to_cart':
            dayStats.cart_additions++;
            break;
          case 'purchase':
            dayStats.purchases++;
            break;
          case 'return':
            dayStats.returns++;
            break;
        }
      });

      // Calculate conversion rates
      const analyticsArray = Array.from(productStats.values()).map(stats => ({
        ...stats,
        conversion_rate: stats.views > 0 ? (stats.purchases / stats.views) * 100 : 0
      }));

      const eventArray = Array.from(dailyEvents.values()).sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setAnalytics(analyticsArray);
      setEventData(eventArray);
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Product Name', 'Views', 'Cart Additions', 'Purchases', 'Returns', 'Conversion Rate (%)'];
    const csvContent = [
      headers.join(','),
      ...analytics.map(item => [
        `"${item.product_name}"`,
        item.views,
        item.cart_additions,
        item.purchases,
        item.returns,
        item.conversion_rate.toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalViews = analytics.reduce((sum, item) => sum + item.views, 0);
  const totalCartAdditions = analytics.reduce((sum, item) => sum + item.cart_additions, 0);
  const totalPurchases = analytics.reduce((sum, item) => sum + item.purchases, 0);
  const totalReturns = analytics.reduce((sum, item) => sum + item.returns, 0);
  const avgConversionRate = analytics.length > 0 
    ? analytics.reduce((sum, item) => sum + item.conversion_rate, 0) / analytics.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              {products.map(product => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cart Additions</p>
                <p className="text-2xl font-bold">{totalCartAdditions.toLocaleString()}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Purchases</p>
                <p className="text-2xl font-bold">{totalPurchases.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Returns</p>
                <p className="text-2xl font-bold">{totalReturns.toLocaleString()}</p>
              </div>
              <RotateCcw className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Conversion</p>
                <p className="text-2xl font-bold">{avgConversionRate.toFixed(1)}%</p>
              </div>
              <CalendarDays className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Events Trend</CardTitle>
            <CardDescription>Track user interactions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={eventData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="cart_additions" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="purchases" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="returns" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products by Views</CardTitle>
            <CardDescription>Most viewed products in selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product_name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Analytics Details</CardTitle>
          <CardDescription>Comprehensive analytics for each product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Cart Additions</TableHead>
                  <TableHead>Purchases</TableHead>
                  <TableHead>Returns</TableHead>
                  <TableHead>Conversion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.map((item) => (
                  <TableRow key={item.product_id}>
                    <TableCell className="font-medium">{item.product_name}</TableCell>
                    <TableCell>{item.views.toLocaleString()}</TableCell>
                    <TableCell>{item.cart_additions.toLocaleString()}</TableCell>
                    <TableCell>{item.purchases.toLocaleString()}</TableCell>
                    <TableCell>{item.returns.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.conversion_rate > 5 ? 'default' : item.conversion_rate > 2 ? 'secondary' : 'destructive'}
                      >
                        {item.conversion_rate.toFixed(2)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {analytics.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No analytics data available for the selected period.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductAnalytics;
