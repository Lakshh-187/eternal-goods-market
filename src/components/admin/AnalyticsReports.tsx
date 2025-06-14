
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsReports = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics & Reports</CardTitle>
        <CardDescription>View business analytics and generate reports</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Analytics and reporting features coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsReports;
