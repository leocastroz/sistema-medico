// server/api/get-user-by-cpf.js
import { defineEventHandler, getQuery } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(); // Obtém as variáveis de ambiente configuradas no Nuxt
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  // Obtém o parâmetro "cpf" da query string
  // const { cpf } = getQuery(event);
 // Log para verificar o CPF recebido

  const query = getQuery(event);
  const cpf = query.cpf;
  console.log('CPF recebido aaa:', cpf); 
  // if (!cpf) {
  //   return { error: 'CPF é obrigatório' };
  // }
  try {
    // Consulta no Supabase
    const { data: existingUser, error: queryError } = await supabase
      .from('users_sorteio_qrcode')
      .select('cpf') // Seleciona todas as colunas
      .eq('cpf', cpf)
      .single(); // Garante que apenas um registro será retornado

    if (queryError) {
      throw queryError;
    }

    return { existingUser }; // Retorna o usuário encontrado
  } catch (error) {
    return { error: error.message }; // Retorna o erro em caso de falha
  }
});