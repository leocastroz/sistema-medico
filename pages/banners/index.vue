<template>
  <div>
    <h1>Banners</h1>
    <p>Bem-vindo à sua Banners!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});
</script>