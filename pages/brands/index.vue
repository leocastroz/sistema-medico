<template>
  <div>
    <h1>Marcas</h1>
    <p>Bem-vindo à sua Marcas!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});
</script>