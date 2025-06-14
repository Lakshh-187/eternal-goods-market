
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, Eye, ShoppingCart, CreditCard, RotateCcw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ProductAnalytics = () => {
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [selectedProduct, dateRange]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name')
        .order('name');
      
      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Load analytics data
      let query = supabase
        .from('product_analytics')
        .select(`
          *,
          products(name)
        `)
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString())
        .order('created_at', { ascending: false });

      if (selectedProduct !== 'all') {
        query = query.eq('product_id', selectedProduct);
      }

      const { data: analyticsData, error: analyticsError } = await query;
      
      if (analyticsError) throw analyticsError;
      setAnalytics(analyticsData || []);

    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Process analytics data for charts
  const processAnalyticsData = () => {
    const eventCounts = analytics.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {});

    const dailyData = analytics.reduce((acc, event) => {
      const date = format(new Date(event.created_at), 'MMM dd');
      if (!acc[date]) {
        acc[date] = { date, view: 0, add_to_cart: 0, purchase: 0, return: 0 };
      }
      acc[date][event.event_type] = (acc[date][event.event_type] || 0) + 1;
      return acc;
    }, {});

    const productData = analytics.reduce((acc, event) => {
      const productName = event.products?.name || 'Unknown';
      if (!acc[productName]) {
        acc[productName] = { name: productName, views: 0, purchases: 0 };
      }
      if (event.event_type === 'view') acc[productName].views++;
      if (event.event_type === 'purchase') acc[productName].purchases++;
      return acc;
    }, {});

    return {
      eventCounts: Object.entries(eventCounts).map(([event, count]) => ({ event, count })),
      dailyData: Object.values(dailyData),
      productData: Object.values(productData)
    };
  };

  const { eventCounts, dailyData, productData } = processAnalyticsData();

  const eventColors = {
    view: '#8884d8',
    add_to_cart: '#82ca9d',
    purchase: '#ffc658',
    return: '#ff7c7c'
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Product', 'Event Type', 'User ID', 'Session ID'];
    const csvData = [
      headers.join(','),
      ...analytics.map(event => [
        format(new Date(event.created_at), 'yyyy-MM-dd HH:mm:ss'),
        event.products?.name || 'Unknown',
        event.event_type,
        event.user_id || 'Anonymous',
        event.session_id || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("justify-start text-left font-normal", !dateRange && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange ? format(dateRange.from, "LLL dd, y") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button onClick={exportToCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold">
                  {analytics.filter(e => e.event_type === 'view').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Add to Cart</p>
                <p className="text-3xl font-bold">
                  {analytics.filter(e => e.event_type === 'add_to_cart').length}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Purchases</p>
                <p className="text-3xl font-bold">
                  {analytics.filter(e => e.event_type === 'purchase').length}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Returns</p>
                <p className="text-3xl font-bold">
                  {analytics.filter(e => e.event_type === 'return').length}
                </p>
              </div>
              <RotateCcw className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Event Distribution</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Distribution</CardTitle>
              <CardDescription>Breakdown of user interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={eventCounts}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ event, count }) => `${event}: ${count}`}
                  >
                    {eventCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={eventColors[entry.event as keyof typeof eventColors] || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Daily Activity Timeline</CardTitle>
              <CardDescription>User interactions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="view" stroke="#8884d8" name="Views" />
                  <Line type="monotone" dataKey="add_to_cart" stroke="#82ca9d" name="Add to Cart" />
                  <Line type="monotone" dataKey="purchase" stroke="#ffc658" name="Purchases" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Views vs purchases by product</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" name="Views" />
                  <Bar dataKey="purchases" fill="#82ca9d" name="Purchases" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductAnalytics;
