
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, ShoppingCart, Package, Gift, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [referralUsage, setReferralUsage] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    gender: ''
  });

  useEffect(() => {
    if (user && !authLoading) {
      loadProfileData();
    }
  }, [user, authLoading]);

  const loadProfileData = async () => {
    try {
      // Load user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }
      
      setProfile(profileData);
      if (profileData) {
        setProfileForm({
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          phone: profileData.phone || '',
          date_of_birth: profileData.date_of_birth || '',
          gender: profileData.gender || ''
        });
      }

      // Load orders
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (!customerError && customer) {
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items(
              *,
              products(name, image_urls)
            )
          `)
          .eq('customer_id', customer.id)
          .order('created_at', { ascending: false });
        
        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
      }

      // Load referral usage
      const { data: referralData, error: referralError } = await supabase
        .from('referral_usage')
        .select(`
          *,
          referral_codes(code),
          orders(order_number)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (referralError) throw referralError;
      setReferralUsage(referralData || []);

    } catch (error) {
      console.error('Error loading profile data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...profileForm,
          date_of_birth: profileForm.date_of_birth || null
        });
      
      if (error) throw error;
      
      toast.success('Profile updated successfully!');
      setEditMode(false);
      loadProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
  const totalSaved = referralUsage.reduce((sum, usage) => sum + parseFloat(usage.discount_amount), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-800 to-purple-900 text-white overflow-hidden">
        <div className="container-custom relative z-10 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                USER PROFILE
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Welcome, <span className="text-gold-400">{profile?.first_name || 'Customer'}</span>
            </h1>
            <p className="text-xl text-gray-200">
              Manage your account, orders, and preferences in one place.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Profile Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-3xl font-bold">₹{totalSpent.toFixed(2)}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Money Saved</p>
                  <p className="text-3xl font-bold">₹{totalSaved.toFixed(2)}</p>
                </div>
                <Gift className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Member Since</p>
                  <p className="text-xl font-bold">
                    {profile?.created_at ? new Date(profile.created_at).getFullYear() : new Date().getFullYear()}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Manage your personal details and contact information</CardDescription>
                  </div>
                  <Button onClick={() => editMode ? updateProfile() : setEditMode(true)}>
                    {editMode ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    {editMode ? (
                      <Input
                        id="first_name"
                        value={profileForm.first_name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, first_name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{profile?.first_name || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    {editMode ? (
                      <Input
                        id="last_name"
                        value={profileForm.last_name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, last_name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{profile?.last_name || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  {editMode ? (
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{profile?.phone || 'Not provided'}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    {editMode ? (
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={profileForm.date_of_birth}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-gray-600">
                        {profile?.date_of_birth ? new Date(profile.date_of_birth).toDateString() : 'Not provided'}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    {editMode ? (
                      <Input
                        id="gender"
                        value={profileForm.gender}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, gender: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{profile?.gender || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {editMode && (
                  <div className="flex gap-2">
                    <Button onClick={updateProfile}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View all your past orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">Order #{order.order_number}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            order.status === 'delivered' ? 'default' : 
                            order.status === 'shipped' ? 'secondary' : 
                            order.status === 'processing' ? 'outline' : 'destructive'
                          }>
                            {order.status}
                          </Badge>
                          <p className="text-lg font-bold mt-1">₹{parseFloat(order.total_amount).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <Separator className="mb-4" />
                      
                      <div className="space-y-2">
                        {order.order_items?.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-3">
                            {item.products?.image_urls?.[0] && (
                              <img
                                src={item.products.image_urls[0]}
                                alt={item.products.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{item.products?.name}</p>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} × ₹{parseFloat(item.unit_price).toFixed(2)}
                              </p>
                            </div>
                            <p className="font-medium">₹{parseFloat(item.total_price).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                  
                  {orders.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600">Start shopping to see your orders here!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Referral Savings</CardTitle>
                <CardDescription>Track your savings from referral codes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Code Used</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Original Amount</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Final Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralUsage.map((usage) => (
                      <TableRow key={usage.id}>
                        <TableCell>{new Date(usage.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge>{usage.referral_codes?.code}</Badge>
                        </TableCell>
                        <TableCell>{usage.orders?.order_number || 'N/A'}</TableCell>
                        <TableCell>₹{parseFloat(usage.original_amount).toFixed(2)}</TableCell>
                        <TableCell className="text-green-600">-₹{parseFloat(usage.discount_amount).toFixed(2)}</TableCell>
                        <TableCell className="font-medium">₹{parseFloat(usage.final_amount).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {referralUsage.length === 0 && (
                  <div className="text-center py-8">
                    <Gift className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No referral codes used yet</h3>
                    <p className="text-gray-600">Use referral codes during checkout to save money!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and privacy settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Email Preferences</h3>
                    <p className="text-sm text-gray-600 mb-4">Choose what emails you'd like to receive</p>
                    {/* Add email preference toggles here */}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
                    <p className="text-sm text-gray-600 mb-4">Control your data and privacy preferences</p>
                    {/* Add privacy settings here */}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Account Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Download My Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
