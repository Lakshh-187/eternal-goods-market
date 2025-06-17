
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Search, Edit, Delete, RefreshCw, Gift } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Coupon {
  id: string;
  code: string;
  name: string;
  discount_type: string;
  discount_value: number;
  minimum_amount: number;
  usage_limit: number;
  current_usage: number;
  is_active: boolean;
  expires_at: string;
  created_at: string;
}

const CouponManagement = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('Error loading coupons:', error);
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (couponId: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;

    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', couponId);

      if (error) throw error;
      
      toast.success('Coupon deleted successfully!');
      loadCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Failed to delete coupon');
    }
  };

  const toggleCouponStatus = async (couponId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ is_active: !currentStatus })
        .eq('id', couponId);

      if (error) throw error;
      
      toast.success('Coupon status updated!');
      loadCoupons();
    } catch (error) {
      console.error('Error updating coupon status:', error);
      toast.error('Failed to update coupon status');
    }
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = !searchTerm || 
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && coupon.is_active) ||
      (statusFilter === 'inactive' && !coupon.is_active);

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coupon Management</CardTitle>
          <CardDescription>Loading coupons...</CardDescription>
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Coupon Management</CardTitle>
              <CardDescription>Create and manage discount coupons</CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Coupon
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search coupons by code or name..."
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
                <SelectItem value="all">All Coupons</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadCoupons} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Coupons Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-mono font-bold">{coupon.code}</TableCell>
                    <TableCell>{coupon.name}</TableCell>
                    <TableCell>
                      {coupon.discount_type === 'percentage' ? 
                        `${coupon.discount_value}%` : 
                        `₹${coupon.discount_value}`
                      }
                    </TableCell>
                    <TableCell>
                      {coupon.current_usage}/{coupon.usage_limit || '∞'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={coupon.is_active ? 'default' : 'secondary'}>
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCoupon(coupon);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={coupon.is_active ? 'secondary' : 'default'}
                          onClick={() => toggleCouponStatus(coupon.id, coupon.is_active)}
                        >
                          {coupon.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteCoupon(coupon.id)}
                        >
                          <Delete className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCoupons.length === 0 && (
            <div className="text-center py-12">
              <Gift className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search' : 'Start by creating your first coupon'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Coupon Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedCoupon(null);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCoupon ? 'Edit Coupon' : 'Add New Coupon'}
            </DialogTitle>
            <DialogDescription>
              {selectedCoupon ? 'Update coupon information' : 'Create a new discount coupon'}
            </DialogDescription>
          </DialogHeader>
          <CouponForm
            coupon={selectedCoupon}
            onSuccess={() => {
              setIsAddModalOpen(false);
              setIsEditModalOpen(false);
              setSelectedCoupon(null);
              loadCoupons();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Simple Coupon Form Component
const CouponForm = ({ coupon, onSuccess }: { coupon: Coupon | null; onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    code: coupon?.code || '',
    name: coupon?.name || '',
    discount_type: coupon?.discount_type || 'percentage',
    discount_value: coupon?.discount_value?.toString() || '',
    minimum_amount: coupon?.minimum_amount?.toString() || '0',
    usage_limit: coupon?.usage_limit?.toString() || '',
    expires_at: coupon?.expires_at ? new Date(coupon.expires_at).toISOString().split('T')[0] : '',
    is_active: coupon?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const couponData = {
        code: formData.code.toUpperCase(),
        name: formData.name,
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        minimum_amount: parseFloat(formData.minimum_amount) || 0,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
        is_active: formData.is_active,
      };

      if (coupon) {
        const { error } = await supabase
          .from('coupons')
          .update(couponData)
          .eq('id', coupon.id);
        
        if (error) throw error;
        toast.success('Coupon updated successfully!');
      } else {
        const { error } = await supabase
          .from('coupons')
          .insert([{ ...couponData, current_usage: 0 }]);
        
        if (error) throw error;
        toast.success('Coupon created successfully!');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving coupon:', error);
      toast.error('Failed to save coupon');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="code">Coupon Code *</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
            placeholder="SAVE20"
            required
          />
        </div>
        <div>
          <Label htmlFor="name">Display Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="20% Off Sale"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="discount_type">Discount Type</Label>
          <Select value={formData.discount_type} onValueChange={(value) => setFormData(prev => ({ ...prev, discount_type: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="discount_value">
            Discount Value * {formData.discount_type === 'percentage' ? '(%)' : '(₹)'}
          </Label>
          <Input
            id="discount_value"
            type="number"
            step="0.01"
            value={formData.discount_value}
            onChange={(e) => setFormData(prev => ({ ...prev, discount_value: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minimum_amount">Minimum Order Amount (₹)</Label>
          <Input
            id="minimum_amount"
            type="number"
            step="0.01"
            value={formData.minimum_amount}
            onChange={(e) => setFormData(prev => ({ ...prev, minimum_amount: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="usage_limit">Usage Limit (Optional)</Label>
          <Input
            id="usage_limit"
            type="number"
            value={formData.usage_limit}
            onChange={(e) => setFormData(prev => ({ ...prev, usage_limit: e.target.value }))}
            placeholder="Leave empty for unlimited"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="expires_at">Expiry Date (Optional)</Label>
        <Input
          id="expires_at"
          type="date"
          value={formData.expires_at}
          onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          {coupon ? 'Update Coupon' : 'Create Coupon'}
        </Button>
      </div>
    </form>
  );
};

export default CouponManagement;
