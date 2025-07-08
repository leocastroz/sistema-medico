import { defineEventHandler, readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      return {
        status: 'error',
        message: 'Credenciais incorretas!',
      };
    }

    return {
      status: 'success',
      message: 'Registration successful!',
      user: data.user,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
});