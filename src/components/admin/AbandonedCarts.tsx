
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, RefreshCw, Mail, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AbandonedCart {
  id: string;
  email: string;
  total_amount: number;
  cart_data: any;
  created_at: string;
  recovered_at: string | null;
  recovery_email_sent_at: string | null;
}

const AbandonedCarts = () => {
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAbandonedCarts();
  }, []);

  const loadAbandonedCarts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('abandoned_carts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCarts(data || []);
    } catch (error) {
      console.error('Error loading abandoned carts:', error);
      toast.error('Failed to load abandoned carts');
    } finally {
      setLoading(false);
    }
  };

  const sendRecoveryEmail = async (cartId: string) => {
    try {
      // In a real implementation, this would trigger an email service
      const { error } = await supabase
        .from('abandoned_carts')
        .update({ recovery_email_sent_at: new Date().toISOString() })
        .eq('id', cartId);

      if (error) throw error;
      toast.success('Recovery email sent successfully');
      loadAbandonedCarts();
    } catch (error) {
      console.error('Error sending recovery email:', error);
      toast.error('Failed to send recovery email');
    }
  };

  const getCartItemsCount = (cartData: any) => {
    if (!cartData || !cartData.items) return 0;
    return cartData.items.length;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Abandoned Carts</CardTitle>
          <CardDescription>Loading abandoned carts...</CardDescription>
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
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Abandoned</p>
                <p className="text-3xl font-bold text-gray-900">{carts.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potential Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{carts.reduce((sum, cart) => sum + (cart.total_amount || 0), 0).toFixed(2)}
                </p>
              </div>
              <Badge variant="outline" className="text-orange-600">Lost Sales</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recovery Rate</p>
                <p className="text-3xl font-bold text-green-900">
                  {carts.filter(c => c.recovered_at).length > 0 ? 
                    Math.round((carts.filter(c => c.recovered_at).length / carts.length) * 100) :
                    0
                  }%
                </p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Recovered</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Abandoned Carts</CardTitle>
          <CardDescription>Track and recover abandoned shopping carts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Button onClick={loadAbandonedCarts} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Abandoned Carts Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Email</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Cart Value</TableHead>
                  <TableHead>Abandoned Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carts.map((cart) => (
                  <TableRow key={cart.id}>
                    <TableCell className="font-medium">{cart.email || 'Guest'}</TableCell>
                    <TableCell>{getCartItemsCount(cart.cart_data)} items</TableCell>
                    <TableCell>₹{(cart.total_amount || 0).toFixed(2)}</TableCell>
                    <TableCell>{new Date(cart.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {cart.recovered_at ? (
                          <Badge variant="default">Recovered</Badge>
                        ) : (
                          <Badge variant="secondary">Abandoned</Badge>
                        )}
                        {cart.recovery_email_sent_at && (
                          <Badge variant="outline" className="text-xs">
                            Email Sent
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {!cart.recovered_at && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => sendRecoveryEmail(cart.id)}
                            disabled={!!cart.recovery_email_sent_at}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {carts.length === 0 && (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No abandoned carts found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AbandonedCarts;
