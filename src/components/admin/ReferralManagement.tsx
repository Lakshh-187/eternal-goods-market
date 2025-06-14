
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gift, Users, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ReferralCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  is_active: boolean;
  max_uses?: number;
  current_uses: number;
  expires_at?: string;
  created_at: string;
}

interface ReferralUsage {
  id: string;
  referral_code: {
    code: string;
  };
  original_amount: number;
  discount_amount: number;
  final_amount: number;
  created_at: string;
  order_id: string;
}

const ReferralManagement = () => {
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([]);
  const [referralUsage, setReferralUsage] = useState<ReferralUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<ReferralCode | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: 0,
    max_uses: '',
    expires_at: ''
  });

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      setLoading(true);

      // Load referral codes
      const { data: codes, error: codesError } = await supabase
        .from('referral_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (codesError) throw codesError;

      // Load referral usage
      const { data: usage, error: usageError } = await supabase
        .from('referral_usage')
        .select(`
          *,
          referral_codes!inner(code)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (usageError) throw usageError;

      setReferralCodes(codes || []);
      setReferralUsage(usage || []);
    } catch (error) {
      console.error('Error loading referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReferralCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code || !formData.discount_value) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const codeData = {
        code: formData.code.toUpperCase(),
        discount_type: formData.discount_type,
        discount_value: Number(formData.discount_value),
        max_uses: formData.max_uses ? Number(formData.max_uses) : null,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
        is_active: true
      };

      if (editingCode) {
        // Update existing code
        const { error } = await supabase
          .from('referral_codes')
          .update(codeData)
          .eq('id', editingCode.id);

        if (error) throw error;
        toast.success('Referral code updated successfully');
      } else {
        // Create new code
        const { error } = await supabase
          .from('referral_codes')
          .insert([codeData]);

        if (error) throw error;
        toast.success('Referral code created successfully');
      }

      setDialogOpen(false);
      setEditingCode(null);
      setFormData({
        code: '',
        discount_type: 'percentage',
        discount_value: 0,
        max_uses: '',
        expires_at: ''
      });
      loadReferralData();
    } catch (error: any) {
      console.error('Error saving referral code:', error);
      if (error.code === '23505') {
        toast.error('A referral code with this name already exists');
      } else {
        toast.error('Failed to save referral code');
      }
    }
  };

  const handleEditCode = (code: ReferralCode) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      discount_type: code.discount_type,
      discount_value: code.discount_value,
      max_uses: code.max_uses?.toString() || '',
      expires_at: code.expires_at ? new Date(code.expires_at).toISOString().split('T')[0] : ''
    });
    setDialogOpen(true);
  };

  const handleToggleActive = async (code: ReferralCode) => {
    try {
      const { error } = await supabase
        .from('referral_codes')
        .update({ is_active: !code.is_active })
        .eq('id', code.id);

      if (error) throw error;
      toast.success(`Referral code ${code.is_active ? 'deactivated' : 'activated'}`);
      loadReferralData();
    } catch (error) {
      console.error('Error toggling referral code:', error);
      toast.error('Failed to update referral code');
    }
  };

  const handleDeleteCode = async (codeId: string) => {
    if (!confirm('Are you sure you want to delete this referral code?')) return;

    try {
      const { error } = await supabase
        .from('referral_codes')
        .delete()
        .eq('id', codeId);

      if (error) throw error;
      toast.success('Referral code deleted successfully');
      loadReferralData();
    } catch (error) {
      console.error('Error deleting referral code:', error);
      toast.error('Failed to delete referral code');
    }
  };

  const totalDiscountGiven = referralUsage.reduce((sum, usage) => sum + usage.discount_amount, 0);
  const totalUsages = referralUsage.length;
  const avgDiscountPerUse = totalUsages > 0 ? totalDiscountGiven / totalUsages : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Codes</p>
                <p className="text-2xl font-bold">{referralCodes.filter(c => c.is_active).length}</p>
              </div>
              <Gift className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold">{totalUsages}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Discount</p>
                <p className="text-2xl font-bold">₹{totalDiscountGiven.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Discount</p>
                <p className="text-2xl font-bold">₹{avgDiscountPerUse.toFixed(2)}</p>
              </div>
              <Gift className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Codes Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Referral Codes</CardTitle>
              <CardDescription>Manage discount codes and promotions</CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingCode(null);
                  setFormData({
                    code: '',
                    discount_type: 'percentage',
                    discount_value: 0,
                    max_uses: '',
                    expires_at: ''
                  });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Referral Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCode ? 'Edit Referral Code' : 'Create Referral Code'}</DialogTitle>
                  <DialogDescription>
                    {editingCode ? 'Update referral code details' : 'Create a new referral code for discounts'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSaveReferralCode} className="space-y-4">
                  <div>
                    <Label htmlFor="code">Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      placeholder="DISCOUNT30"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="discount_type">Discount Type *</Label>
                      <Select
                        value={formData.discount_type}
                        onValueChange={(value: 'percentage' | 'fixed') => 
                          setFormData(prev => ({ ...prev, discount_type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
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
                        min="0"
                        step={formData.discount_type === 'percentage' ? '1' : '0.01'}
                        max={formData.discount_type === 'percentage' ? '100' : undefined}
                        value={formData.discount_value}
                        onChange={(e) => setFormData(prev => ({ ...prev, discount_value: parseFloat(e.target.value) || 0 }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="max_uses">Max Uses (Optional)</Label>
                      <Input
                        id="max_uses"
                        type="number"
                        min="1"
                        value={formData.max_uses}
                        onChange={(e) => setFormData(prev => ({ ...prev, max_uses: e.target.value }))}
                        placeholder="Unlimited"
                      />
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
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingCode ? 'Update Code' : 'Create Code'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralCodes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell className="font-mono font-medium">{code.code}</TableCell>
                    <TableCell>
                      {code.discount_type === 'percentage' 
                        ? `${code.discount_value}%` 
                        : `₹${code.discount_value}`
                      }
                    </TableCell>
                    <TableCell>
                      {code.current_uses}{code.max_uses ? ` / ${code.max_uses}` : ' / ∞'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={code.is_active ? 'default' : 'secondary'}>
                        {code.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {code.expires_at 
                        ? new Date(code.expires_at).toLocaleDateString()
                        : 'Never'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCode(code)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(code)}
                        >
                          {code.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCode(code.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Referral Usage</CardTitle>
          <CardDescription>Latest referral code usage by customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code Used</TableHead>
                  <TableHead>Original Amount</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Final Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralUsage.map((usage) => (
                  <TableRow key={usage.id}>
                    <TableCell className="font-mono">{usage.referral_code.code}</TableCell>
                    <TableCell>₹{usage.original_amount.toFixed(2)}</TableCell>
                    <TableCell className="text-green-600">-₹{usage.discount_amount.toFixed(2)}</TableCell>
                    <TableCell className="font-medium">₹{usage.final_amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(usage.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {referralUsage.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No referral usage found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralManagement;
