
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { UserPlus, Search, RefreshCw, Eye, Ban, Mail, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
  address: any;
  user_id: string;
}

const UserManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [customerStats, setCustomerStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    newThisMonth: 0
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const customers = data || [];
      setCustomers(customers);

      // Calculate stats
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      setCustomerStats({
        totalCustomers: customers.length,
        activeCustomers: customers.filter(c => c.status === 'active').length,
        inactiveCustomers: customers.filter(c => c.status === 'inactive').length,
        newThisMonth: customers.filter(c => new Date(c.created_at) >= startOfMonth).length
      });

    } catch (error) {
      console.error('Error loading customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const updateCustomerStatus = async (customerId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', customerId);

      if (error) throw error;

      toast.success('Customer status updated successfully');
      loadCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Failed to update customer status');
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = !searchTerm || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Loading customers...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">{customerStats.totalCustomers}</p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-3xl font-bold text-green-900">{customerStats.activeCustomers}</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Customers</p>
                <p className="text-3xl font-bold text-gray-900">{customerStats.inactiveCustomers}</p>
              </div>
              <Badge variant="secondary">Inactive</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-3xl font-bold text-purple-900">{customerStats.newThisMonth}</p>
              </div>
              <Badge variant="outline" className="text-purple-600">New</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>Manage customer accounts and view customer information</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadCustomers} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Customers Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.first_name} {customer.last_name}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(customer.status)}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsViewModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateCustomerStatus(
                            customer.id, 
                            customer.status === 'active' ? 'inactive' : 'active'
                          )}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No customers found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Customer Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              View complete customer information and order history
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <CustomerDetailsView customer={selectedCustomer} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Customer Details View Component
const CustomerDetailsView = ({ customer }: { customer: Customer }) => {
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    lastOrderDate: null as string | null
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    loadCustomerDetails();
  }, [customer.id]);

  const loadCustomerDetails = async () => {
    try {
      // Get order stats
      const { data: orders } = await supabase
        .from('orders')
        .select('id, total_amount, status, created_at, order_number')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (orders) {
        setRecentOrders(orders);
        setOrderStats({
          totalOrders: orders.length,
          totalSpent: orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0),
          lastOrderDate: orders.length > 0 ? orders[0].created_at : null
        });
      }
    } catch (error) {
      console.error('Error loading customer details:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Customer Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Full Name</Label>
          <p className="mt-1">{customer.first_name} {customer.last_name}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Email</Label>
          <p className="mt-1">{customer.email}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Phone</Label>
          <p className="mt-1">{customer.phone || 'Not provided'}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Status</Label>
          <p className="mt-1">
            <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
            </Badge>
          </p>
        </div>
        <div>
          <Label className="text-sm font-medium">Join Date</Label>
          <p className="mt-1">{new Date(customer.created_at).toLocaleDateString()}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Last Updated</Label>
          <p className="mt-1">{new Date(customer.updated_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Order Stats */}
      <div>
        <Label className="text-sm font-medium">Order Statistics</Label>
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-2xl font-bold">{orderStats.totalOrders}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-2xl font-bold">₹{orderStats.totalSpent.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm font-bold">
              {orderStats.lastOrderDate ? new Date(orderStats.lastOrderDate).toLocaleDateString() : 'Never'}
            </p>
            <p className="text-sm text-gray-600">Last Order</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <Label className="text-sm font-medium">Recent Orders</Label>
        <div className="mt-2 space-y-2">
          {recentOrders.length > 0 ? recentOrders.map((order: any) => (
            <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{parseFloat(order.total_amount).toFixed(2)}</p>
                <Badge variant="outline">{order.status}</Badge>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">No orders found</p>
          )}
        </div>
      </div>

      {/* Address */}
      {customer.address && (
        <div>
          <Label className="text-sm font-medium">Address</Label>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <pre className="text-sm">{JSON.stringify(customer.address, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
