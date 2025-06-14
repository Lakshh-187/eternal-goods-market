
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, ShoppingBag, CreditCard, MapPin, Bell, Edit, Package, Heart, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface CustomerData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: any;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  order_items: {
    id: string;
    quantity: number;
    unit_price: number;
    products: {
      name: string;
      image_urls: string[];
    };
  }[];
}

interface Wishlist {
  id: string;
  products: {
    id: string;
    name: string;
    price: number;
    image_urls: string[];
    status: string;
  };
}

const CustomerProfile = () => {
  const { user } = useAuth();
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India'
    }
  });

  useEffect(() => {
    if (user) {
      loadCustomerData();
      loadOrders();
      loadWishlist();
    }
  }, [user]);

  const loadCustomerData = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setCustomerData(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          address: data.address || {
            street: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'India'
          }
        });
      }
    } catch (error) {
      console.error('Error loading customer data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name, image_urls)
          )
        `)
        .eq('customer_id', customerData?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const loadWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          *,
          products (
            id, name, price, image_urls, status
          )
        `)
        .eq('user_id', user?.id);

      if (error) throw error;
      setWishlist(data || []);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (customerData) {
        // Update existing customer
        const { error } = await supabase
          .from('customers')
          .update({
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            address: formData.address
          })
          .eq('id', customerData.id);

        if (error) throw error;
      } else {
        // Create new customer record
        const { error } = await supabase
          .from('customers')
          .insert([{
            user_id: user?.id,
            email: user?.email || '',
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            address: formData.address
          }]);

        if (error) throw error;
      }

      toast.success('Profile updated successfully');
      setEditMode(false);
      loadCustomerData();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('id', wishlistId);

      if (error) throw error;
      toast.success('Item removed from wishlist');
      loadWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item');
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'shipped': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTotalSpent = () => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.total_amount, 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">
                {formData.first_name?.[0]}{formData.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {formData.first_name} {formData.last_name}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">
                Member since {customerData ? new Date(customerData.created_at).toLocaleDateString() : 'Recently'}
              </p>
            </div>
            <Button onClick={() => setEditMode(!editMode)}>
              <Edit className="h-4 w-4 mr-2" />
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold">₹{getTotalSpent().toFixed(2)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                <p className="text-2xl font-bold">{wishlist.length}</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Referral Savings</p>
                <p className="text-2xl font-bold">₹0.00</p>
              </div>
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and address</CardDescription>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Address</h3>
                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      <Textarea
                        id="street"
                        value={formData.address.street}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          address: { ...prev.address, street: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.address.city}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            address: { ...prev.address, city: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.address.state}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            address: { ...prev.address, state: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                          id="postal_code"
                          value={formData.address.postal_code}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            address: { ...prev.address, postal_code: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <p className="text-lg">{formData.first_name || 'Not provided'}</p>
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <p className="text-lg">{formData.last_name || 'Not provided'}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <p className="text-lg">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <div className="text-lg">
                      {formData.address.street && <p>{formData.address.street}</p>}
                      {(formData.address.city || formData.address.state || formData.address.postal_code) && (
                        <p>
                          {formData.address.city}, {formData.address.state} {formData.address.postal_code}
                        </p>
                      )}
                      {!formData.address.street && !formData.address.city && (
                        <p className="text-gray-500">No address provided</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Track your orders and purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Number</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.order_number}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {order.order_items.slice(0, 2).map((item) => (
                              <span key={item.id} className="text-sm">
                                {item.products.name} (x{item.quantity})
                              </span>
                            ))}
                            {order.order_items.length > 2 && (
                              <span className="text-sm text-gray-500">
                                +{order.order_items.length - 2} more items
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>₹{order.total_amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getOrderStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {orders.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found. Start shopping!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
              <CardDescription>Items you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-md mb-4 overflow-hidden">
                        {item.products.image_urls?.[0] ? (
                          <img
                            src={item.products.image_urls[0]}
                            alt={item.products.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium mb-2">{item.products.name}</h3>
                      <p className="text-lg font-bold mb-3">₹{item.products.price.toFixed(2)}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">Add to Cart</Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {wishlist.length === 0 && (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your wishlist is empty. Add some products!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-500">Get notified about order status changes</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-gray-500">Receive offers and discount notifications</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Privacy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Export</p>
                        <p className="text-sm text-gray-500">Download your account data</p>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-gray-500">Permanently delete your account</p>
                      </div>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerProfile;
