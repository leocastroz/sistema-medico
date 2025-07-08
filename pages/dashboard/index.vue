<template>
  <div>
    <h1>Dashboard</h1>
    <p>Bem-vindo à sua dashboard!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});
</script>