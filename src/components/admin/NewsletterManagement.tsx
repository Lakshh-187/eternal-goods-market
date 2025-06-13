
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, Search, RefreshCw, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

const NewsletterManagement = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error loading newsletter subscribers:', error);
      toast.error('Failed to load newsletter subscribers');
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriberStatus = async (subscriberId: string, isActive: boolean) => {
    try {
      const updateData = {
        is_active: !isActive,
        ...(isActive ? { unsubscribed_at: new Date().toISOString() } : { unsubscribed_at: null })
      };

      const { error } = await supabase
        .from('newsletter_subscribers')
        .update(updateData)
        .eq('id', subscriberId);

      if (error) throw error;
      toast.success('Subscriber status updated');
      loadSubscribers();
    } catch (error) {
      console.error('Error updating subscriber:', error);
      toast.error('Failed to update subscriber');
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    !searchTerm || 
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subscriber.name && subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Newsletter Management</CardTitle>
          <CardDescription>Loading newsletter subscribers...</CardDescription>
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
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-3xl font-bold text-gray-900">{subscribers.length}</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                <p className="text-3xl font-bold text-green-900">
                  {subscribers.filter(s => s.is_active).length}
                </p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unsubscribed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {subscribers.filter(s => !s.is_active).length}
                </p>
              </div>
              <Badge variant="secondary">Inactive</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter Management</CardTitle>
          <CardDescription>Manage newsletter subscribers and campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subscribers by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Button onClick={loadSubscribers} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Send Campaign
            </Button>
          </div>

          {/* Subscribers Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead>Unsubscribed Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>{subscriber.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={subscriber.is_active ? 'default' : 'secondary'}>
                        {subscriber.is_active ? 'Active' : 'Unsubscribed'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(subscriber.subscribed_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {subscriber.unsubscribed_at ? 
                        new Date(subscriber.unsubscribed_at).toLocaleDateString() : 
                        'N/A'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.is_active)}
                        >
                          {subscriber.is_active ? 'Unsubscribe' : 'Resubscribe'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No newsletter subscribers found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManagement;
