
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
        <CardDescription>Manage payment transactions and methods</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Payment management features coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default PaymentManagement;
