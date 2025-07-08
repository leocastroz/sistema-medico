export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  globalThis.$nuxtWebHookEvent?.emit('webhook-event', body);
  return { 
    success: true, 
    message: 'Evento recebido com sucesso!' 
  };
});