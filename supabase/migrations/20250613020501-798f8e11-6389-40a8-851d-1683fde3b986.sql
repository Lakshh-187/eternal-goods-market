
-- Create comprehensive database schema for e-commerce admin panel

-- Product variations table
CREATE TABLE IF NOT EXISTS public.product_variations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  variation_type TEXT NOT NULL, -- size, color, etc.
  variation_value TEXT NOT NULL,
  price_adjustment DECIMAL(10,2) DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  sku TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Shipping zones and rates
CREATE TABLE IF NOT EXISTS public.shipping_zones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  countries TEXT[] DEFAULT '{}',
  states TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.shipping_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  zone_id UUID REFERENCES public.shipping_zones(id) ON DELETE CASCADE,
  method_name TEXT NOT NULL, -- standard, express, overnight
  base_cost DECIMAL(10,2) NOT NULL,
  cost_per_kg DECIMAL(10,2) DEFAULT 0,
  free_shipping_threshold DECIMAL(10,2),
  delivery_days_min INTEGER DEFAULT 3,
  delivery_days_max INTEGER DEFAULT 7,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Coupons and discounts
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed', 'free_shipping')),
  discount_value DECIMAL(10,2) NOT NULL,
  minimum_amount DECIMAL(10,2) DEFAULT 0,
  maximum_discount DECIMAL(10,2),
  usage_limit INTEGER,
  usage_limit_per_user INTEGER DEFAULT 1,
  current_usage INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  applicable_products UUID[] DEFAULT '{}',
  applicable_categories UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Coupon usage tracking
CREATE TABLE IF NOT EXISTS public.coupon_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id UUID,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  discount_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Abandoned carts
CREATE TABLE IF NOT EXISTS public.abandoned_carts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  session_id TEXT,
  email TEXT,
  cart_data JSONB NOT NULL,
  total_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'INR',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  recovered_at TIMESTAMP WITH TIME ZONE,
  recovery_email_sent_at TIMESTAMP WITH TIME ZONE
);

-- Wishlists
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Reviews and ratings
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  review_text TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Return/refund requests
CREATE TABLE IF NOT EXISTS public.return_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processed')),
  refund_amount DECIMAL(10,2),
  admin_notes TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Site settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB,
  setting_type TEXT DEFAULT 'text', -- text, number, boolean, json, file
  description TEXT,
  category TEXT DEFAULT 'general',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Admin activity logs
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT, -- product, order, user, etc.
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Support tickets
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE,
  user_id UUID,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_admin_id UUID,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ticket replies
CREATE TABLE IF NOT EXISTS public.ticket_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  user_id UUID,
  admin_id UUID,
  message TEXT NOT NULL,
  attachments TEXT[],
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tax rules
CREATE TABLE IF NOT EXISTS public.tax_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tax_rate DECIMAL(5,2) NOT NULL,
  tax_type TEXT DEFAULT 'percentage' CHECK (tax_type IN ('percentage', 'fixed')),
  applicable_countries TEXT[] DEFAULT '{}',
  applicable_states TEXT[] DEFAULT '{}',
  product_categories UUID[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.product_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.return_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_rules ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin can manage all, users have limited access
CREATE POLICY "Admins can manage all product variations" ON public.product_variations FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Everyone can view active product variations" ON public.product_variations FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage shipping zones" ON public.shipping_zones FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Everyone can view active shipping zones" ON public.shipping_zones FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage shipping rates" ON public.shipping_rates FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Everyone can view active shipping rates" ON public.shipping_rates FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage coupons" ON public.coupons FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Everyone can view active coupons" ON public.coupons FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can view all coupon usage" ON public.coupon_usage FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can view their coupon usage" ON public.coupon_usage FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all abandoned carts" ON public.abandoned_carts FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can manage their abandoned carts" ON public.abandoned_carts FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their wishlists" ON public.wishlists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all wishlists" ON public.wishlists FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Everyone can view approved reviews" ON public.product_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can manage their reviews" ON public.product_reviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all reviews" ON public.product_reviews FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage their return requests" ON public.return_requests FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all return requests" ON public.return_requests FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage newsletter subscribers" ON public.newsletter_subscribers FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Everyone can view public site settings" ON public.site_settings FOR SELECT USING (is_public = true);
CREATE POLICY "Admins can manage all site settings" ON public.site_settings FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view admin activity logs" ON public.admin_activity_logs FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage their support tickets" ON public.support_tickets FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all support tickets" ON public.support_tickets FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view replies to their tickets" ON public.ticket_replies FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.support_tickets WHERE id = ticket_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can manage all ticket replies" ON public.ticket_replies FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage tax rules" ON public.tax_rules FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Everyone can view active tax rules" ON public.tax_rules FOR SELECT USING (is_active = true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_product_variations_updated_at BEFORE UPDATE ON public.product_variations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_abandoned_carts_updated_at BEFORE UPDATE ON public.abandoned_carts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON public.product_reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_return_requests_updated_at BEFORE UPDATE ON public.return_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description, category, is_public) VALUES
('site_name', '"Uniford E-commerce"', 'text', 'Site name', 'general', true),
('site_description', '"Premium e-commerce platform"', 'text', 'Site description', 'general', true),
('contact_email', '"info@uniford.com"', 'text', 'Contact email', 'general', true),
('contact_phone', '"+1234567890"', 'text', 'Contact phone', 'general', true),
('currency', '"INR"', 'text', 'Default currency', 'general', true),
('tax_enabled', 'true', 'boolean', 'Enable tax calculation', 'tax', false),
('shipping_enabled', 'true', 'boolean', 'Enable shipping', 'shipping', false),
('guest_checkout', 'true', 'boolean', 'Allow guest checkout', 'checkout', false)
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default shipping zone (India)
INSERT INTO public.shipping_zones (name, countries) VALUES
('India', ARRAY['IN'])
ON CONFLICT DO NOTHING;

-- Insert default tax rule (18% GST for India)
INSERT INTO public.tax_rules (name, tax_rate, applicable_countries) VALUES
('India GST', 18.00, ARRAY['IN'])
ON CONFLICT DO NOTHING;

-- Function to generate ticket numbers
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'TKT-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD((RANDOM() * 99999)::INT::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to track admin activities
CREATE OR REPLACE FUNCTION public.log_admin_activity(
  p_admin_user_id UUID,
  p_action TEXT,
  p_resource_type TEXT DEFAULT NULL,
  p_resource_id UUID DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO public.admin_activity_logs (
    admin_user_id, action, resource_type, resource_id, old_values, new_values
  ) VALUES (
    p_admin_user_id, p_action, p_resource_type, p_resource_id, p_old_values, p_new_values
  ) RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
