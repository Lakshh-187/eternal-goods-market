
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, RefreshCw, Eye, MessageSquare, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Review {
  id: string;
  rating: number;
  title: string;
  review_text: string;
  is_approved: boolean;
  created_at: string;
  products?: {
    name: string;
  };
  customers?: {
    first_name: string;
    last_name: string;
  };
}

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_reviews')
        .select(`
          *,
          products(name),
          customers(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const toggleReviewApproval = async (reviewId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .update({ is_approved: !currentStatus })
        .eq('id', reviewId);

      if (error) throw error;
      
      toast.success(`Review ${!currentStatus ? 'approved' : 'unapproved'}!`);
      loadReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = !searchTerm || 
      review.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.products?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'approved' && review.is_approved) ||
      (statusFilter === 'pending' && !review.is_approved);

    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review Management</CardTitle>
          <CardDescription>Loading reviews...</CardDescription>
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
          <CardTitle>Review Management</CardTitle>
          <CardDescription>Moderate and manage product reviews</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews by title or product..."
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
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadReviews} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Reviews Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.products?.name}</TableCell>
                    <TableCell>
                      {review.customers ? 
                        `${review.customers.first_name} ${review.customers.last_name}` :
                        'Anonymous'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="ml-1 text-sm text-gray-600">({review.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{review.title}</TableCell>
                    <TableCell>
                      <Badge variant={review.is_approved ? 'default' : 'secondary'}>
                        {review.is_approved ? 'Approved' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={review.is_approved ? 'secondary' : 'default'}
                          onClick={() => toggleReviewApproval(review.id, review.is_approved)}
                        >
                          {review.is_approved ? 'Unapprove' : 'Approve'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600">No reviews match your current filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewManagement;
