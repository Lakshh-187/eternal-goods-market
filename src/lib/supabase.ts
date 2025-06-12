
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twogxdshhwcyvxmvywjs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3b2d4ZHNoaHdjeXZ4bXZ5d2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDI0MTMsImV4cCI6MjA2NTIxODQxM30.ysdhjEUWzdbVxx_O8GM07PIDY59X-j9wjKfL-uwAzHQ';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

export const isSupabaseConfigured = () => {
  return true;
};
