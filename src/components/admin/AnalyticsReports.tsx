
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

const AnalyticsReports = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Reports</CardTitle>
          <CardDescription>View detailed analytics and generate reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 mb-4">View sales analytics, customer insights and generate reports.</p>
            <Button>View Analytics</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReports;
