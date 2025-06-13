export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      abandoned_carts: {
        Row: {
          cart_data: Json
          created_at: string
          currency: string | null
          email: string | null
          id: string
          recovered_at: string | null
          recovery_email_sent_at: string | null
          session_id: string | null
          total_amount: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          cart_data: Json
          created_at?: string
          currency?: string | null
          email?: string | null
          id?: string
          recovered_at?: string | null
          recovery_email_sent_at?: string | null
          session_id?: string | null
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          cart_data?: Json
          created_at?: string
          currency?: string | null
          email?: string | null
          id?: string
          recovered_at?: string | null
          recovery_email_sent_at?: string | null
          session_id?: string | null
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_activity_logs: {
        Row: {
          action: string
          admin_user_id: string | null
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      coupon_usage: {
        Row: {
          coupon_id: string | null
          created_at: string
          discount_amount: number
          id: string
          order_id: string | null
          user_id: string | null
        }
        Insert: {
          coupon_id?: string | null
          created_at?: string
          discount_amount: number
          id?: string
          order_id?: string | null
          user_id?: string | null
        }
        Update: {
          coupon_id?: string | null
          created_at?: string
          discount_amount?: number
          id?: string
          order_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupon_usage_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_usage_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          applicable_categories: string[] | null
          applicable_products: string[] | null
          code: string
          created_at: string
          current_usage: number | null
          description: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean | null
          maximum_discount: number | null
          minimum_amount: number | null
          name: string
          starts_at: string | null
          updated_at: string
          usage_limit: number | null
          usage_limit_per_user: number | null
        }
        Insert: {
          applicable_categories?: string[] | null
          applicable_products?: string[] | null
          code: string
          created_at?: string
          current_usage?: number | null
          description?: string | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          maximum_discount?: number | null
          minimum_amount?: number | null
          name: string
          starts_at?: string | null
          updated_at?: string
          usage_limit?: number | null
          usage_limit_per_user?: number | null
        }
        Update: {
          applicable_categories?: string[] | null
          applicable_products?: string[] | null
          code?: string
          created_at?: string
          current_usage?: number | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          maximum_discount?: number | null
          minimum_amount?: number | null
          name?: string
          starts_at?: string | null
          updated_at?: string
          usage_limit?: number | null
          usage_limit_per_user?: number | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: Json | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          name: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          product_id: string | null
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          created_at: string
          customer_id: string | null
          id: string
          notes: string | null
          order_number: string
          payment_status: string | null
          shipping_address: Json | null
          status: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          customer_id?: string | null
          id?: string
          notes?: string | null
          order_number: string
          payment_status?: string | null
          shipping_address?: Json | null
          status?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          customer_id?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_status?: string | null
          shipping_address?: Json | null
          status?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          gateway_order_id: string | null
          gateway_payment_id: string | null
          gateway_response: Json | null
          id: string
          order_id: string | null
          payment_gateway: string
          payment_method: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          gateway_order_id?: string | null
          gateway_payment_id?: string | null
          gateway_response?: Json | null
          id?: string
          order_id?: string | null
          payment_gateway?: string
          payment_method?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          gateway_order_id?: string | null
          gateway_payment_id?: string | null
          gateway_response?: Json | null
          id?: string
          order_id?: string | null
          payment_gateway?: string
          payment_method?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_analytics: {
        Row: {
          created_at: string
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          product_id: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          product_id?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          product_id?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_analytics_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          created_at: string
          helpful_count: number | null
          id: string
          is_approved: boolean | null
          is_verified_purchase: boolean | null
          order_id: string | null
          product_id: string | null
          rating: number
          review_text: string | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_approved?: boolean | null
          is_verified_purchase?: boolean | null
          order_id?: string | null
          product_id?: string | null
          rating: number
          review_text?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_approved?: boolean | null
          is_verified_purchase?: boolean | null
          order_id?: string | null
          product_id?: string | null
          rating?: number
          review_text?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          price_adjustment: number | null
          product_id: string | null
          sku: string | null
          stock_quantity: number | null
          updated_at: string
          variation_type: string
          variation_value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          price_adjustment?: number | null
          product_id?: string | null
          sku?: string | null
          stock_quantity?: number | null
          updated_at?: string
          variation_type: string
          variation_value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          price_adjustment?: number | null
          product_id?: string | null
          sku?: string | null
          stock_quantity?: number | null
          updated_at?: string
          variation_type?: string
          variation_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          dimensions: string | null
          id: string
          image_urls: string[] | null
          meta_description: string | null
          meta_title: string | null
          name: string
          price: number
          short_description: string | null
          sku: string | null
          status: string | null
          stock: number
          tags: string[] | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          id?: string
          image_urls?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          price: number
          short_description?: string | null
          sku?: string | null
          status?: string | null
          stock?: number
          tags?: string[] | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          id?: string
          image_urls?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          price?: number
          short_description?: string | null
          sku?: string | null
          status?: string | null
          stock?: number
          tags?: string[] | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          current_uses: number | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          current_uses?: number | null
          discount_type?: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          current_uses?: number | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      referral_usage: {
        Row: {
          created_at: string
          discount_amount: number
          final_amount: number
          id: string
          order_id: string | null
          original_amount: number
          referral_code_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          discount_amount: number
          final_amount: number
          id?: string
          order_id?: string | null
          original_amount: number
          referral_code_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          discount_amount?: number
          final_amount?: number
          id?: string
          order_id?: string | null
          original_amount?: number
          referral_code_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_usage_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_usage_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      return_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          images: string[] | null
          order_id: string | null
          reason: string
          refund_amount: number | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          images?: string[] | null
          order_id?: string | null
          reason: string
          refund_amount?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          images?: string[] | null
          order_id?: string | null
          reason?: string
          refund_amount?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "return_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_rates: {
        Row: {
          base_cost: number
          cost_per_kg: number | null
          created_at: string
          delivery_days_max: number | null
          delivery_days_min: number | null
          free_shipping_threshold: number | null
          id: string
          is_active: boolean | null
          method_name: string
          zone_id: string | null
        }
        Insert: {
          base_cost: number
          cost_per_kg?: number | null
          created_at?: string
          delivery_days_max?: number | null
          delivery_days_min?: number | null
          free_shipping_threshold?: number | null
          id?: string
          is_active?: boolean | null
          method_name: string
          zone_id?: string | null
        }
        Update: {
          base_cost?: number
          cost_per_kg?: number | null
          created_at?: string
          delivery_days_max?: number | null
          delivery_days_min?: number | null
          free_shipping_threshold?: number | null
          id?: string
          is_active?: boolean | null
          method_name?: string
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipping_rates_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "shipping_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_zones: {
        Row: {
          countries: string[] | null
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          states: string[] | null
        }
        Insert: {
          countries?: string[] | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          states?: string[] | null
        }
        Update: {
          countries?: string[] | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          states?: string[] | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_public: boolean | null
          setting_key: string
          setting_type: string | null
          setting_value: Json | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key: string
          setting_type?: string | null
          setting_value?: Json | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key?: string
          setting_type?: string | null
          setting_value?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_admin_id: string | null
          category: string | null
          created_at: string
          id: string
          message: string
          priority: string | null
          status: string | null
          subject: string
          ticket_number: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_admin_id?: string | null
          category?: string | null
          created_at?: string
          id?: string
          message: string
          priority?: string | null
          status?: string | null
          subject: string
          ticket_number: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_admin_id?: string | null
          category?: string | null
          created_at?: string
          id?: string
          message?: string
          priority?: string | null
          status?: string | null
          subject?: string
          ticket_number?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tax_rules: {
        Row: {
          applicable_countries: string[] | null
          applicable_states: string[] | null
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          product_categories: string[] | null
          tax_rate: number
          tax_type: string | null
        }
        Insert: {
          applicable_countries?: string[] | null
          applicable_states?: string[] | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          product_categories?: string[] | null
          tax_rate: number
          tax_type?: string | null
        }
        Update: {
          applicable_countries?: string[] | null
          applicable_states?: string[] | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          product_categories?: string[] | null
          tax_rate?: number
          tax_type?: string | null
        }
        Relationships: []
      }
      ticket_replies: {
        Row: {
          admin_id: string | null
          attachments: string[] | null
          created_at: string
          id: string
          is_internal: boolean | null
          message: string
          ticket_id: string | null
          user_id: string | null
        }
        Insert: {
          admin_id?: string | null
          attachments?: string[] | null
          created_at?: string
          id?: string
          is_internal?: boolean | null
          message: string
          ticket_id?: string | null
          user_id?: string | null
        }
        Update: {
          admin_id?: string | null
          attachments?: string[] | null
          created_at?: string
          id?: string
          is_internal?: boolean | null
          message?: string
          ticket_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_replies_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          phone: string | null
          preferences: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_ticket_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      log_admin_activity: {
        Args: {
          p_admin_user_id: string
          p_action: string
          p_resource_type?: string
          p_resource_id?: string
          p_old_values?: Json
          p_new_values?: Json
        }
        Returns: string
      }
      track_product_event: {
        Args: {
          p_product_id: string
          p_event_type: string
          p_user_id?: string
          p_session_id?: string
          p_metadata?: Json
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
