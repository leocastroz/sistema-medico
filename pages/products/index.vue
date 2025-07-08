<template>
  <div class="produtos-container">
    <h1 class="titulo">Produtos do Sorteio</h1>

    <div class="produtos-lista">
      <div v-for="(premio, index) in produtosSorteio" :key="index" class="produto-card">
        <img :src="premio.image" alt="Imagem do Produto" class="produto-imagem">
        <div class="produto-info">
          <p><strong>ID:</strong> {{ premio.id || index + 1 }}</p>
          <p><strong>Título:</strong> {{ premio.title }}</p>
          <p><strong>Valor:</strong> {{ premio.valor || 'Indefinido' }}</p>
        </div>
        <button class="btn-deletar" @click="deleteItem(premio)">Deletar</button>
      </div>
    </div>

    <form @submit.prevent="createProduto" class="form-produto">
      <input v-model="newProduto.title" type="text" placeholder="Título do Produto" required />
      <input v-model="newProduto.valor" type="text" placeholder="Valor do Produto" required />
      <input type="file" @change="handleImageUpload" accept="image/*" required />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});

import { ref, onMounted } from 'vue';
import { createClient } from "@supabase/supabase-js";
import Compressor from 'compressorjs';

const supaStore = useSupabaseClient();
const SUPABASE_URL = supaStore.supabaseUrl;
const SUPABASE_KEY = supaStore.supabaseKey;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const produtosSorteio = ref([]);

const newProduto = ref({
  title: '',
  image: '',
  valor: ''
});

const loading = ref(false);

onMounted(async () => {
  fetchSorteioData();
});

async function deleteItem(premio) {
  console.log('Deleting produto_sorteio...', premio.id);

  const response = await supabase.from('produtos_sorteio').delete().eq('id', premio.id)
  if (response.error) {
    console.error('Error deleting produto_sorteio:', response.error);
  } else {
    console.log('Produto deleted successfully:', response.data);
    produtosSorteio.value = produtosSorteio.value.filter(item => item.id !== premio.id);
  }
  
}

async function fetchSorteioData() {
  console.log('Fetching produtos_sorteio...');
  const { data, error } = await supabase.from('produtos_sorteio').select('*');
  if (error) {
    console.error('Error fetching sorteio data:', error);
  } else {
    console.log('Sorteio data:', data);
    produtosSorteio.value = data;
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Compress the image
  new Compressor(file, {
    quality: 0.6, // Adjust quality (0.6 = 60%)
    maxWidth: 800, // Resize to a maximum width
    success(compressedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        newProduto.value.image = reader.result; // Base64 string
        console.log('Base64 Image:', newProduto.value.image);
      };
      reader.readAsDataURL(compressedFile);
    },
    error(err) {
      console.error('Image compression error:', err);
    }
  });
};

const createProduto = async () => {
  try {
    loading.value = true;
    console.log('Creating new produto:', newProduto.value);
    const { data, error } = await supabase.from('produtos_sorteio').insert([{
      title: newProduto.value.title,
      image: newProduto.value.image,
      valor: newProduto.value.valor
    }]);

    if (error) {
      console.error('Error creating produto:', error);
    } else {
      console.log('Produto created successfully:', data);
      // produtosSorteio.value.push(data[0]); // Add the newly created product to the list
      newProduto.value = { title: '', image: '', valor: '' }; // Reset form
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
}

.titulo {
  color: #e30614;
  margin-bottom: 20px;
  font-size: 26px;
}

.produtos-lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.produto-card {
  background-color: #fdfdfd;
  border-left: 4px solid #e30614;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.produto-card:hover {
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(227, 6, 20, 0.1);
}

.produto-imagem {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.produto-info p {
  margin: 4px 0;
  color: #333;
  font-size: 14px;
}

.btn-deletar {
  margin-left: auto;
  padding: 6px 12px;
  background-color: #e30614;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-deletar:hover {
  background-color: #b50411;
}

.form-produto {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.form-produto input[type="text"],
.form-produto input[type="file"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}

.form-produto button {
  padding: 10px 20px;
  background-color: #e30614;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.form-produto button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
