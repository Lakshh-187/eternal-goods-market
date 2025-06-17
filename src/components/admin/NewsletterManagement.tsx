
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw, Mail, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  subscribed_at: string;
}

const NewsletterManagement = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
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
      console.error('Error loading subscribers:', error);
      toast.error('Failed to load newsletter subscribers');
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => 
    !searchTerm || 
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Newsletter Management</CardTitle>
              <CardDescription>Manage newsletter subscribers and campaigns</CardDescription>
            </div>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex gap-4 mb-6">
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
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{subscribers.length}</p>
                  <p className="text-sm text-gray-600">Total Subscribers</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{subscribers.filter(s => s.is_active).length}</p>
                  <p className="text-sm text-gray-600">Active Subscribers</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{subscribers.filter(s => !s.is_active).length}</p>
                  <p className="text-sm text-gray-600">Unsubscribed</p>
                </div>
              </CardContent>
            </Card>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>{subscriber.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={subscriber.is_active ? 'default' : 'secondary'}>
                        {subscriber.is_active ? 'Active' : 'Unsubscribed'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(subscriber.subscribed_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers found</h3>
              <p className="text-gray-600">No subscribers match your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManagement;
