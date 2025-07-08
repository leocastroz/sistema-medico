<template>
  <div>
    <h1>Novo acesso</h1>
    <p>Bem-vindo à sua Novo acesso!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});
</script>