import { defineEventHandler } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  console.log('CONFIG NUXT ->', config.supabaseUrl, config.supabaseKey);

  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  try {
    const { data, error } = await supabase
      .from('produtos_galeradapa263')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
});