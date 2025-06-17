
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const SiteSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>Configure general site settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Site Configuration</h3>
            <p className="text-gray-600 mb-4">Manage site settings, SEO, and configuration options.</p>
            <Button>Configure Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;
