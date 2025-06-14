
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Gift, Users, TrendingDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ReferralManagement = () => {
  const [referralCodes, setReferralCodes] = useState<any[]>([]);
  const [referralUsage, setReferralUsage] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCode, setNewCode] = useState({
    code: '',
    discount_type: 'percentage',
    discount_value: '',
    max_uses: '',
    expires_at: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load referral codes
      const { data: codesData, error: codesError } = await supabase
        .from('referral_codes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (codesError) throw codesError;
      setReferralCodes(codesData || []);

      // Load referral usage
      const { data: usageData, error: usageError } = await supabase
        .from('referral_usage')
        .select(`
          *,
          referral_codes(code),
          orders(order_number)
        `)
        .order('created_at', { ascending: false });
      
      if (usageError) throw usageError;
      setReferralUsage(usageData || []);

    } catch (error) {
      console.error('Error loading referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const createReferralCode = async () => {
    try {
      const codeData = {
        code: newCode.code.toUpperCase(),
        discount_type: newCode.discount_type,
        discount_value: parseFloat(newCode.discount_value),
        max_uses: newCode.max_uses ? parseInt(newCode.max_uses) : null,
        expires_at: newCode.expires_at ? new Date(newCode.expires_at).toISOString() : null
      };

      const { error } = await supabase
        .from('referral_codes')
        .insert([codeData]);
      
      if (error) throw error;
      
      toast.success('Referral code created successfully!');
      setShowCreateDialog(false);
      setNewCode({
        code: '',
        discount_type: 'percentage',
        discount_value: '',
        max_uses: '',
        expires_at: ''
      });
      loadData();
    } catch (error) {
      console.error('Error creating referral code:', error);
      toast.error('Failed to create referral code');
    }
  };

  const toggleCodeStatus = async (codeId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('referral_codes')
        .update({ is_active: !currentStatus })
        .eq('id', codeId);
      
      if (error) throw error;
      
      toast.success('Referral code status updated!');
      loadData();
    } catch (error) {
      console.error('Error updating referral code:', error);
      toast.error('Failed to update referral code');
    }
  };

  const totalDiscountGiven = referralUsage.reduce((sum, usage) => sum + parseFloat(usage.discount_amount), 0);
  const totalUsers = new Set(referralUsage.map(usage => usage.user_id)).size;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Codes</p>
                <p className="text-3xl font-bold">
                  {referralCodes.filter(code => code.is_active).length}
                </p>
              </div>
              <Gift className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Users Benefited</p>
                <p className="text-3xl font-bold">{totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Discount Given</p>
                <p className="text-3xl font-bold">₹{totalDiscountGiven.toFixed(2)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
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
              <CardDescription>Manage discount codes and track their usage</CardDescription>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Referral Code</DialogTitle>
                  <DialogDescription>Set up a new discount code for customers</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Code</Label>
                    <Input
                      id="code"
                      value={newCode.code}
                      onChange={(e) => setNewCode(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="DISCOUNT20"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="discount_type">Discount Type</Label>
                      <Select
                        value={newCode.discount_type}
                        onValueChange={(value) => setNewCode(prev => ({ ...prev, discount_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="discount_value">Discount Value</Label>
                      <Input
                        id="discount_value"
                        type="number"
                        value={newCode.discount_value}
                        onChange={(e) => setNewCode(prev => ({ ...prev, discount_value: e.target.value }))}
                        placeholder={newCode.discount_type === 'percentage' ? '20' : '100'}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max_uses">Max Uses (Optional)</Label>
                      <Input
                        id="max_uses"
                        type="number"
                        value={newCode.max_uses}
                        onChange={(e) => setNewCode(prev => ({ ...prev, max_uses: e.target.value }))}
                        placeholder="100"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expires_at">Expires At (Optional)</Label>
                      <Input
                        id="expires_at"
                        type="datetime-local"
                        value={newCode.expires_at}
                        onChange={(e) => setNewCode(prev => ({ ...prev, expires_at: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={createReferralCode} className="w-full">
                    Create Referral Code
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-medium">{code.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{code.discount_type}</Badge>
                  </TableCell>
                  <TableCell>
                    {code.discount_type === 'percentage' ? `${code.discount_value}%` : `₹${code.discount_value}`}
                  </TableCell>
                  <TableCell>
                    {code.current_uses || 0}
                    {code.max_uses && ` / ${code.max_uses}`}
                  </TableCell>
                  <TableCell>
                    <Badge variant={code.is_active ? 'default' : 'secondary'}>
                      {code.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {code.expires_at ? new Date(code.expires_at).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={code.is_active}
                      onCheckedChange={() => toggleCodeStatus(code.id, code.is_active)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Usage History */}
      <Card>
        <CardHeader>
          <CardTitle>Usage History</CardTitle>
          <CardDescription>Track how referral codes are being used</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Code</TableHead>
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
                  <TableCell className="text-red-600">-₹{parseFloat(usage.discount_amount).toFixed(2)}</TableCell>
                  <TableCell className="font-medium">₹{parseFloat(usage.final_amount).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralManagement;
