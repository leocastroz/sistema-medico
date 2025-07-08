import { defineEventHandler, readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  console.log('CONFIG NUXT ->', config.supabaseUrl, config.supabaseKey);

  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  if (event.req.method === 'POST') {
    console.log('POST');
    try {
      const body = await readBody(event);
      const { data, error } = await supabase
        .from('produtos_galeradapa263')
        .insert([body]);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      return { error: error.message };
    }
  } else {
    return { error: 'Method not allowed' };
  }
});