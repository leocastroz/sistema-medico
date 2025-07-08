import { defineEventHandler, getQuery } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  console.log('CONFIG NUXT ->', config.supabaseUrl, config.supabaseKey);

  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  // Obter o token da query string
  const query = getQuery(event);
  const token = query.token;
  console.log('Token received:', token);
  if (!token) {
    return { error: 'Token is required' };
  }

  try {
    const { data: record, error: queryError } = await supabase
      .from('sorteio_qrcode')
      .select('*')
      .eq('token', token)
      .single();

    if (queryError) {
      throw queryError;
    }

    return { record };
  } catch (error) {
    return { error: error.message };
  }
});