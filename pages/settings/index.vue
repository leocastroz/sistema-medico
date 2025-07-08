<template>
  <div>
    <h1>Configurações</h1>
    <p>Bem-vindo à sua Configurações!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});
</script>