
import { createClient } from '@supabase/supabase-js';

// TODO: REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
// You can find these in your Supabase Dashboard -> Project Settings -> API
const SUPABASE_URL = 'https://fbhavnwndchevmovhuze.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiaGF2bnduZGNoZXZtb3ZodXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NTMzNjMsImV4cCI6MjA4MDAyOTM2M30.UMrn_4B8lM-wdmVUkChfniA_2PTTmtp5cQqzq8BobEs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
