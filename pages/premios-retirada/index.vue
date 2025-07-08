<template>
  <div>
    <h1>Premios retirada</h1>
    <p>Bem-vindo à sua premios!</p>
    <div v-for="(premio, index) in listPremios" :key="index">
      <div class="premio-item" style="display: flex;gap: 10px">
        <p>Prêmio ID: {{ index + 1 }}</p>
        <p>Premio: {{ premio.premio }}</p>
        <p>Retirada: {{ premio.retirada_at ?  premio.retirada_at : 'indefinido' }}</p>
        <p>Entregue por: {{ premio.data_resgate ? remio.data_resgate : 'indefinido' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
definePageMeta({
  middleware: ['auth'],
  layout: 'dashcliente'
});

const sub = ref(null);
const listPremios = ref([]);

function getUser() {
  const user = useSupabaseUser();
  sub.value = user.value.user_metadata.sub;
  console.log('User data:', user.value.user_metadata.sub);
  return user.value;
}

onMounted(() => {
  getUser();
  getPremios();
});

import { createClient } from "@supabase/supabase-js";
const supaStore = useSupabaseClient();
const SUPABASE_URL = supaStore.supabaseUrl;
const SUPABASE_KEY = supaStore.supabaseKey;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getPremios() {
  const { data, error } = await supabase.from('resgates_sorteio').select('*').eq('user_id', sub.value);
  if (error) {
    console.error('Error fetching premios:', error);
  } else {
    listPremios.value = data;
  }
}
</script>