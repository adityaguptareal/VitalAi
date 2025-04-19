import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// Update this line to match your .env variable name
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase