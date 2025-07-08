<template>
  <div>
    <h1>Lista de Faturas</h1>
    <ul v-if="data">
      <pre v-for="fatura in data">{{ fatura }}</pre>
    </ul>
    <p v-else-if="error">Erro ao carregar faturas: {{ error.message }}</p>
    <p v-else>Carregando...</p>
  </div>
</template>

<script setup>
const { data, error } = await useFetch('/api/list', { method: 'GET' });
console.log('resp ->', data.value.data);
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});
</script>
