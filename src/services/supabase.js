import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jjhvcneznffmhrmdxhgj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqaHZjbmV6bmZmbWhybWR4aGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwNjc3NDMsImV4cCI6MjAwNDY0Mzc0M30.d1mNKbRHCGnu0Z7runize7fhaVswzN61XfD2APr6da0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
