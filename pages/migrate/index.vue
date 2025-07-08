<template>
  <div>
    <h1>Migrate</h1>
    <p>Bem-vindo à sua Migrate!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});
</script>