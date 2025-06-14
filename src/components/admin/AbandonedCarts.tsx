
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AbandonedCarts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Abandoned Carts</CardTitle>
        <CardDescription>Track and recover abandoned shopping carts</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Abandoned cart recovery features coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default AbandonedCarts;
