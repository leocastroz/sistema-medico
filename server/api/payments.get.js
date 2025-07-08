import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  console.log('KEY ABACATE ->', config.abacateKey);
  try {
    const response = await $fetch('https://api.abacatepay.com/v1/billing/list', {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${config.abacateKey}`
      }
    });
    return response;
  } catch(error) {
    return error;
  }
});