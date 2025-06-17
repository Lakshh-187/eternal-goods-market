
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, RefreshCw, Eye, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ReturnRequest {
  id: string;
  reason: string;
  status: string;
  refund_amount: number;
  created_at: string;
  orders?: {
    order_number: string;
  };
  customers?: {
    first_name: string;
    last_name: string;
  };
}

const ReturnManagement = () => {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
          orders(order_number),
          customers(first_name, last_name)
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

  const updateReturnStatus = async (returnId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('return_requests')
        .update({ status: newStatus })
        .eq('id', returnId);

      if (error) throw error;
      
      toast.success('Return status updated!');
      loadReturns();
    } catch (error) {
      console.error('Error updating return:', error);
      toast.error('Failed to update return status');
    }
  };

  const filteredReturns = returns.filter(returnReq => {
    const matchesSearch = !searchTerm || 
      returnReq.orders?.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnReq.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || returnReq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'processed': return 'default';
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
          <CardDescription>Process customer return requests</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order number or reason..."
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
                <SelectItem value="all">All Returns</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
              </SelectContent>
            </Select>
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
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Refund Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.map((returnReq) => (
                  <TableRow key={returnReq.id}>
                    <TableCell className="font-medium">{returnReq.orders?.order_number}</TableCell>
                    <TableCell>
                      {returnReq.customers ? 
                        `${returnReq.customers.first_name} ${returnReq.customers.last_name}` :
                        'N/A'
                      }
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{returnReq.reason}</TableCell>
                    <TableCell>
                      {returnReq.refund_amount ? 
                        `₹${parseFloat(returnReq.refund_amount.toString()).toFixed(2)}` : 
                        'TBD'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(returnReq.status)}>
                        {returnReq.status.charAt(0).toUpperCase() + returnReq.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(returnReq.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {returnReq.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateReturnStatus(returnReq.id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateReturnStatus(returnReq.id, 'rejected')}
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

          {filteredReturns.length === 0 && (
            <div className="text-center py-12">
              <RotateCcw className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No return requests found</h3>
              <p className="text-gray-600">No return requests match your current filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnManagement;
