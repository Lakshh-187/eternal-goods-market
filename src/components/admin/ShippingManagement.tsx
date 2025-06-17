
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';

const ShippingManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Management</CardTitle>
          <CardDescription>Configure shipping rates and zones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Truck className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Management</h3>
            <p className="text-gray-600 mb-4">Configure shipping rates, zones and delivery options.</p>
            <Button>Configure Shipping</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingManagement;
