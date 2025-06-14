
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SupportTickets = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Tickets</CardTitle>
        <CardDescription>Manage customer support requests</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Support ticket management features coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default SupportTickets;
