// import { defineEventHandler, readBody } from "h3";
// import { createClient } from "@supabase/supabase-js";

// export default defineEventHandler(async (event) => {
//   const { token } = await readBody(event);

//   const config = useRuntimeConfig();

//   const supabase = createClient(config.supabaseUrl, config.supabaseKey);

//   if (event.req.method === "POST") {
//     console.log("POST");
//     try {
//       const body = await readBody(event);
//       const { data, error } = await supabase
//         .from("sorteio_qrcode")
//         .insert([body]);

//       if (error) {
//         throw error;
//       }

//       return data;
//       // Se o status for "pendente", marca como "lido"
//       if (data.status === "pendente") {
//         const { error: updateError } = await supabase
//           .from("sorteio_qrcode")
//           .update({ status: "lido" })
//           .eq("token", token);

//         if (updateError) {
//           throw createError({
//             statusCode: 500,
//             message: "Erro ao atualizar status",
//           });
//         }

//         return { status: "lido" };
//       }

//       // Se o status já for "lido", retorna o status atual
//       return { status: data.status };
//     } catch (error) {
//       return { error: error.message };
//     }
//   } else {
//     return { error: "Method not allowed" };
//   }
// });


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
        .from('sorteio_qrcode')
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