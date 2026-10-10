import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://akkahprtcttznhhdvgcb.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFra2FocHJ0Y3R0em5oaGR2Z2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NjAwNDcsImV4cCI6MjEwNzEzNjA0N30.MLJiXqbwEUxmilB4gp4INg2_6SDsquhMnN_WoxuhqJ4'

export const TARGET_GMAIL = 'sandhucosmetics1@gmail.com'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Helper to test if orders table exists and is accessible
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .limit(1)

    if (error) {
      return {
        connected: false,
        tableReady: false,
        error: error.message || error.code || 'Table not found',
      }
    }
    return {
      connected: true,
      tableReady: true,
      error: null,
    }
  } catch (err) {
    return {
      connected: false,
      tableReady: false,
      error: err.message || 'Network error',
    }
  }
}
