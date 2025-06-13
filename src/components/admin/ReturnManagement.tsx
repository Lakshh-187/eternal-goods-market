
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, RefreshCw, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ReturnRequest {
  id: string;
  reason: string;
  status: string;
  refund_amount: number;
  admin_notes: string;
  created_at: string;
  orders?: {
    order_number: string;
  };
}

const ReturnManagement = () => {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReturns();
  }, []);

  const loadReturns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('return_requests')
        .select(`
          *,
          orders(order_number)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReturns(data || []);
    } catch (error) {
      console.error('Error loading returns:', error);
      toast.error('Failed to load return requests');
    } finally {
      setLoading(false);
    }
  };

  const updateReturnStatus = async (returnId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('return_requests')
        .update({ status })
        .eq('id', returnId);

      if (error) throw error;
      toast.success('Return status updated successfully');
      loadReturns();
    } catch (error) {
      console.error('Error updating return:', error);
      toast.error('Failed to update return status');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'processed': return 'outline';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Return Management</CardTitle>
          <CardDescription>Loading return requests...</CardDescription>
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
          <CardTitle>Return Management</CardTitle>
          <CardDescription>Handle customer return and refund requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Button onClick={loadReturns} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Returns Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Refund Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.map((returnRequest) => (
                  <TableRow key={returnRequest.id}>
                    <TableCell className="font-medium">
                      {returnRequest.orders?.order_number}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm max-w-xs truncate">{returnRequest.reason}</p>
                    </TableCell>
                    <TableCell>
                      {returnRequest.refund_amount ? 
                        `₹${parseFloat(returnRequest.refund_amount.toString()).toFixed(2)}` : 
                        'TBD'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(returnRequest.status)}>
                        {returnRequest.status.charAt(0).toUpperCase() + returnRequest.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(returnRequest.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {returnRequest.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateReturnStatus(returnRequest.id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateReturnStatus(returnRequest.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {returns.length === 0 && (
            <div className="text-center py-8">
              <RotateCcw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No return requests found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnManagement;
