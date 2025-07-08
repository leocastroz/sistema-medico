<template>
  <div style="padding: 30px;color: #B9B28A">
    <h1>Lista de Faturas - tela de vendas</h1>
    <ul v-if="data">
      <pre v-for="fatura in data" :key="fatura.id">{{ fatura }}</pre>
    </ul>
    <p v-else-if="error">Erro ao carregar faturas: {{ error.message }}</p>
    <p v-else>Carregando...</p>

    <button @click="showModal = true">Cadastrar Produto</button>

    <div v-if="showModal" @close="showModal = false">
      <div>
        <h3>Cadastrar Produto</h3>
      </div>
      <div>
        <form @submit.prevent="submitForm">
          <div v-for="field in fields" :key="field.name">
            <label :for="field.name">{{ field.label }}</label>
            <input v-model="form[field.name]" :id="field.name" :type="field.type" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});

const { data, error } = await useFetch('/api/products', { method: 'GET' });
console.log('resp ->', data.value.data);

const showModal = ref(false);
const form = ref({
  base_photo: '',
  campoDesconto: '',
  codProduto: '',
  descricao: '',
  estrela: '',
  fileName: '',
  image_three: '',
  image_four: '',
  image_one: '',
  image_two: '',
  marca: '',
  nome: '',
  status: '',
  tipo: '',
  totalModelo: '',
  user_id: '',
  valor: '',
  whatsapp: ''
});

const fields = [
  { name: 'base_photo', label: 'Base Photo', type: 'text' },
  { name: 'campoDesconto', label: 'Campo Desconto', type: 'text' },
  { name: 'codProduto', label: 'Código do Produto', type: 'text' },
  { name: 'descricao', label: 'Descrição', type: 'text' },
  { name: 'estrela', label: 'Estrela', type: 'text' },
  { name: 'fileName', label: 'File Name', type: 'text' },
  { name: 'image_three', label: 'Image Three', type: 'text' },
  { name: 'image_four', label: 'Image Four', type: 'text' },
  { name: 'image_one', label: 'Image One', type: 'text' },
  { name: 'image_two', label: 'Image Two', type: 'text' },
  { name: 'marca', label: 'Marca', type: 'text' },
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'status', label: 'Status', type: 'text' },
  { name: 'tipo', label: 'Tipo', type: 'text' },
  { name: 'totalModelo', label: 'Total Modelo', type: 'text' },
  { name: 'user_id', label: 'User ID', type: 'text' },
  { name: 'valor', label: 'Valor', type: 'text' },
  { name: 'whatsapp', label: 'WhatsApp', type: 'text' }
];

const submitForm = async () => {
  try {
    const response = await useFetch('/api/products', {
      method: 'POST',
      body: form.value
    });
    console.log('Form data submitted:', response);
    showModal.value = false;
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>