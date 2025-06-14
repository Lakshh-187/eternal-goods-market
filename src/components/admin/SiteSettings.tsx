
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SiteSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>Configure site-wide settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Site settings features coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default SiteSettings;
