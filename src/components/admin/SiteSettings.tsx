
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Settings, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    site_name: '',
    site_description: '',
    contact_email: '',
    contact_phone: '',
    currency: 'INR',
    tax_enabled: true,
    shipping_enabled: true,
    guest_checkout: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_key, setting_value');

      if (error) throw error;

      const settingsMap = data?.reduce((acc: any, item: any) => {
        acc[item.setting_key] = JSON.parse(item.setting_value);
        return acc;
      }, {});

      setSettings(prev => ({ ...prev, ...settingsMap }));
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      
      const updates = Object.entries(settings).map(([key, value]) => ({
        setting_key: key,
        setting_value: JSON.stringify(value),
        updated_at: new Date().toISOString()
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'setting_key' });
        
        if (error) throw error;
      }

      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>Configure your e-commerce site settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={settings.site_name}
                  onChange={(e) => handleInputChange('site_name', e.target.value)}
                  placeholder="Your Site Name"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  placeholder="INR"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea
                id="site_description"
                value={settings.site_description}
                onChange={(e) => handleInputChange('site_description', e.target.value)}
                placeholder="Brief description of your site"
                rows={3}
              />
            </div>
          </div>

          {/* Contact Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  placeholder="contact@yoursite.com"
                />
              </div>
              <div>
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  placeholder="+1234567890"
                />
              </div>
            </div>
          </div>

          {/* Feature Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Feature Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tax_enabled">Enable Tax Calculation</Label>
                  <p className="text-sm text-gray-500">Automatically calculate taxes on orders</p>
                </div>
                <Switch
                  id="tax_enabled"
                  checked={settings.tax_enabled}
                  onCheckedChange={(checked) => handleInputChange('tax_enabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="shipping_enabled">Enable Shipping</Label>
                  <p className="text-sm text-gray-500">Allow customers to select shipping options</p>
                </div>
                <Switch
                  id="shipping_enabled"
                  checked={settings.shipping_enabled}
                  onCheckedChange={(checked) => handleInputChange('shipping_enabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="guest_checkout">Allow Guest Checkout</Label>
                  <p className="text-sm text-gray-500">Let customers checkout without creating an account</p>
                </div>
                <Switch
                  id="guest_checkout"
                  checked={settings.guest_checkout}
                  onCheckedChange={(checked) => handleInputChange('guest_checkout', checked)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={saveSettings} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;
