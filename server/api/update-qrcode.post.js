import { defineEventHandler, readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  // Lê os dados enviados no corpo da requisição
  const body = await readBody(event);

  const { token, recordId, status, userData } = body;

  // Validação dos dados recebidos
  if (!token || !recordId || !status || !userData) {
    return { error: 'Todos os campos (token, recordId, status, userData) são obrigatórios.' };
  }

  try {
    // Atualiza os dados na tabela sorteio_qrcode
    const { data, error } = await supabase
      .from('sorteio_qrcode')
      .update({
        id: recordId,
        token,
        status,
        user_data: userData,
      })
      .eq('token', token);

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    return { error: error.message };
  }
});