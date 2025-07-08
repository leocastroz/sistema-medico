import { defineEventHandler, readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);
  

  // Lê os dados enviados no corpo da requisição
  const body = await readBody(event);

  const { email, password, nome, cpf } = body;

  if (!email || !password || !nome || !cpf) {
    return { error: 'Todos os campos são obrigatórios.' };
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
          cpf,
          pontos: 0,
          role: 'cliente',
        },
      },
    });

    if (authError) {
      throw authError;
    }

    return { authData };
  } catch (error) {
    return { error: error.message };
  }
});