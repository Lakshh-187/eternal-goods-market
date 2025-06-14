
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NewsletterManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Management</CardTitle>
        <CardDescription>Manage email newsletters and subscribers</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Newsletter management features coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default NewsletterManagement;
