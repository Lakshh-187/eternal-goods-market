
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Package, Target, TrendingUp, ShoppingCart, Heart, MessageSquare, Settings, CreditCard, Truck, BarChart3, UserCheck, Gift, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Import admin components
import DashboardOverview from '@/components/admin/DashboardOverview';
import ProductManagement from '@/components/admin/ProductManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import UserManagement from '@/components/admin/UserManagement';
import PaymentManagement from '@/components/admin/PaymentManagement';
import CouponManagement from '@/components/admin/CouponManagement';
import ShippingManagement from '@/components/admin/ShippingManagement';
import ReviewManagement from '@/components/admin/ReviewManagement';
import ReturnManagement from '@/components/admin/ReturnManagement';
import AnalyticsReports from '@/components/admin/AnalyticsReports';
import SiteSettings from '@/components/admin/SiteSettings';
import SupportTickets from '@/components/admin/SupportTickets';
import NewsletterManagement from '@/components/admin/NewsletterManagement';
import AbandonedCarts from '@/components/admin/AbandonedCarts';
import ProductAnalytics from '@/components/admin/ProductAnalytics';
import ReferralManagement from '@/components/admin/ReferralManagement';

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Redirect if not admin
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const tabItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: Target },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'referrals', label: 'Referrals', icon: Gift },
    { id: 'coupons', label: 'Coupons', icon: Gift },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'abandoned', label: 'Abandoned Carts', icon: ShoppingCart },
    { id: 'support', label: 'Support', icon: UserCheck },
    { id: 'newsletter', label: 'Newsletter', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Site
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome, {user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-8 lg:grid-cols-15 gap-1 h-auto p-1 min-w-max">
              {tabItems.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex flex-col items-center gap-1 p-3 text-xs whitespace-nowrap"
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="dashboard">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <ProductAnalytics />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentManagement />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralManagement />
          </TabsContent>

          <TabsContent value="coupons">
            <CouponManagement />
          </TabsContent>

          <TabsContent value="shipping">
            <ShippingManagement />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewManagement />
          </TabsContent>

          <TabsContent value="returns">
            <ReturnManagement />
          </TabsContent>

          <TabsContent value="abandoned">
            <AbandonedCarts />
          </TabsContent>

          <TabsContent value="support">
            <SupportTickets />
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
