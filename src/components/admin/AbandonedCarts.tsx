
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw, ShoppingCart, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AbandonedCart {
  id: string;
  email: string;
  total_amount: number;
  cart_data: any;
  created_at: string;
  recovery_email_sent_at: string;
}

const AbandonedCarts = () => {
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      const { error } = await supabase
        .from('abandoned_carts')
        .update({ recovery_email_sent_at: new Date().toISOString() })
        .eq('id', cartId);

      if (error) throw error;
      
      toast.success('Recovery email sent!');
      loadAbandonedCarts();
    } catch (error) {
      console.error('Error sending recovery email:', error);
      toast.error('Failed to send recovery email');
    }
  };

  const filteredCarts = carts.filter(cart => 
    !searchTerm || cart.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Card>
        <CardHeader>
          <CardTitle>Abandoned Carts</CardTitle>
          <CardDescription>Recover abandoned shopping carts and increase conversions</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Button onClick={loadAbandonedCarts} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{carts.length}</p>
                  <p className="text-sm text-gray-600">Abandoned Carts</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    ₹{carts.reduce((sum, cart) => sum + parseFloat(cart.total_amount.toString()), 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Total Value</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {carts.filter(c => c.recovery_email_sent_at).length}
                  </p>
                  <p className="text-sm text-gray-600">Recovery Emails Sent</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carts Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Abandoned Date</TableHead>
                  <TableHead>Recovery Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCarts.map((cart) => (
                  <TableRow key={cart.id}>
                    <TableCell>{cart.email}</TableCell>
                    <TableCell>
                      {cart.cart_data ? Object.keys(cart.cart_data).length : 0} items
                    </TableCell>
                    <TableCell>₹{parseFloat(cart.total_amount.toString()).toFixed(2)}</TableCell>
                    <TableCell>{new Date(cart.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {cart.recovery_email_sent_at ? 
                        new Date(cart.recovery_email_sent_at).toLocaleDateString() : 
                        'Not sent'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      {!cart.recovery_email_sent_at && (
                        <Button
                          size="sm"
                          onClick={() => sendRecoveryEmail(cart.id)}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Send Email
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCarts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No abandoned carts found</h3>
              <p className="text-gray-600">No abandoned carts match your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AbandonedCarts;
