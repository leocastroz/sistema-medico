<template>
  <div class="clientes-container">
    <h1>Clientes</h1>
    <p class="subtitulo">Bem-vindo à sua lista de clientes!</p>

    <div class="clientes-lista" v-if="data">
      <div class="card-cliente" v-for="cliente in data" :key="cliente.id">
        <p><strong>Nome:</strong> {{ cliente.nome }}</p>
        <p><strong>Email:</strong> {{ cliente.email }}</p>
        <p><strong>CPF:</strong> {{ cliente.cpf }}</p>
        <p><strong>Pontos:</strong> {{ cliente.pontos }}</p>
        <input
          class="input-pontos"
          type="number"
          v-model="cliente.pontos"
          @change="updatePontos(cliente.id, cliente.pontos)"
          placeholder="Editar pontos"
        />
      </div>
    </div>

    <p v-else-if="error" class="erro">
      Erro ao carregar clientes: {{ error.message }}
    </p>
    <p v-else>Carregando...</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";
const supaStore = useSupabaseClient();
const SUPABASE_URL = supaStore.supabaseUrl;
const SUPABASE_KEY = supaStore.supabaseKey;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const { data, error } = await useFetch("/api/list_users_system", {
  method: "GET",
});
console.log("resp ->", data.value.data);

const updatePontos = async (id, pontos) => {
  try {
    const { data, error } = await supabase
      .from("users_sorteio_qrcode")
      .update({ pontos })
      .eq("id", id);
    
      useToastify("Pontos atualizados!", {
        autoClose: 2000,
        theme: "colored",
        type: "success",
        position: ToastifyOption.POSITION.TOP_RIGHT,
      });

    if (error) {
      throw new Error(`Erro ao atualizar pontos: ${error.message}`);
    }

    console.log(`Pontos atualizados para o usuário ${id}: ${pontos}`);
  } catch (err) {
    console.error(err.message);
  }
};

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});
</script>

<style scoped>
.clientes-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
  font-family: "Segoe UI", sans-serif;
}

h1 {
  font-size: 32px;
  color: #e30614;
  margin-bottom: 10px;
}

.subtitulo {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

.clientes-lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card-cliente {
  background-color: #f9f9f9;
  border-left: 5px solid #e30614;
  padding: 20px;
  border-radius: 10px;
  transition: 0.3s ease;
}

.card-cliente:hover {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(227, 6, 20, 0.1);
}

.card-cliente p {
  margin: 8px 0;
  color: #444;
}

.input-pontos {
  width: 100%;
  padding: 8px;
  border: 1px solid #e30614;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 16px;
}

.input-pontos:focus {
  outline: none;
  border-color: #b50411;
  box-shadow: 0 0 5px rgba(227, 6, 20, 0.4);
}

.erro {
  color: red;
}
</style>
