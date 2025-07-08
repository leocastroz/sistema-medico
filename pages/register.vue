<script setup>
import { ref, onMounted } from 'vue'
// import AppNotification from '@/components/AppNotification.vue';
import { createClient } from "@supabase/supabase-js";
import { useRoute } from 'nuxt/app'

const route = useRoute();
// const router = useRouter();

const supaStore = useSupabaseClient();
const SUPABASE_URL = supaStore.supabaseUrl;
const SUPABASE_KEY = supaStore.supabaseKey;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const user = useSupabaseUser();
const email = ref('');
const password = ref('');
const username = ref('');
const confirmPassword = ref('');
const showComponent = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');
const plano = ref('')
const erro = ref('')
// const planoPlus = ref(false);
// const planoPrime = ref(false);

const { auth } = useSupabaseClient();

// const getUsers = async () => {
//   const { data, error } = await supabase.from('profiles').select('*');
//   if (error) {
//     console.error('Erro ao buscar o perfil do usuário:', error)
//     return [];
//   } else {
//     return data;
//   }
// };

// Atualizando tabela (profiles)
const updateUserTableProfile = async (userId) => {
  const { data, error } = await supabase.from('profiles').update({ username: username.value, user_email: email.value }).eq('id', userId);

  if (error) {
    console.error('Erro ao atualizar username:', error);
  } else {
    console.log('Username atualizado com sucesso:', data);
  }
}

const criaUser = async () => {
  const { data, error } = await auth.signUp({
    email: 'drogariapopularpa@gmail.com',
    password: 'drogariapopular@',
    options: {
      data: {
        empresa: 'drogariapopular',
        phone: '+55 (11) 99999-9999',
        cpf: null,
        cnpj: '12345678901234',
        // data_plano: data_plano,
        type_plan: 'enterprise',
        base_photo: '',
        user_abacate: '',
        // proximo_pagamento: now.toISOString(),
        // sequency: 0,
      }
    }
  });

}

const userRegister = async () => {
  if (password.value !== confirmPassword.value) {
    showComponent.value = true
    notificationMessage.value = "Passwords do not match!";
    notificationType.value = "error";
    password.value = "";
    confirmPassword.value = "";
    setTimeout(() => {
      showComponent.value = false
      notificationMessage.value = "";
    }, 3100);
    return;
  }
  if (username.value === "") {
    showComponent.value = true
    notificationMessage.value = "Username is required!";
    notificationType.value = "error";
    setTimeout(() => {
      showComponent.value = false
      notificationMessage.value = "";
    }, 3100);
    return;
  }

  // Validando se o (username) já existe
  const users = await getUsers();
  console.log('Pegando users ->', users);
  const usernameExists = users.some(user => user.username === username.value);
  console.log('user-existe ->', usernameExists); // false or true
  if (usernameExists) {
    showComponent.value = true
    notificationMessage.value = "Username already exists!";
    notificationType.value = "error";
    setTimeout(() => {
      showComponent.value = false
      notificationMessage.value = "";
    }, 3100);
    return;
  }

  // Validando se o (user_email) já existe
  const emailExists = users.some(user => user.user_email === email.value);
  console.log('user-emaill ->', emailExists);
  if (emailExists) {
    showComponent.value = true;
    notificationMessage.value = "Email already exists!";
    notificationType.value = "error";
    setTimeout(() => {
      showComponent.value = false
      notificationMessage.value = "";
    }, 3100);
    return;
  }

  try {
    showComponent.value = true
    const { data, error } = await auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
        },
      },
    });
    if (data) {
      const userId = data.user.id;
      await updateUserTableProfile(userId);
    }
    email.value = "";
    password.value = "";
    avatar_url.value = confirmPassword.value = "";
    showComponent.value = false
    notificationMessage.value = "Registration successful!";
    notificationType.value = "success";
    if (error) throw error;
  } catch (error) {
    showComponent.value = true
    notificationMessage.value = error.message;
    notificationType.value = "error";
    setTimeout(() => {
      showComponent.value = false
      notificationMessage.value = "";
    }, 3100);
  }
};

watchEffect(() => {
  if (user.value) {
    // return navigateTo('/dashboard');
  }
});

onMounted(() => {
  plano.value = route.query.plano || 'Nenhum plano selecionado'

  // Exemplo de validação
  if (!plano.value || plano.value === 'Nenhum plano selecionado') {
    erro.value = 'Por favor, selecione um plano válido!'
  }
})


const atualizaPlano = (planoSelecionado) => {
  const url = new URL(window.location);
  url.searchParams.set('plano', planoSelecionado);
  window.history.pushState({}, '', url);
  plano.value = planoSelecionado;
  // console.log('Plano selecionado:', planoSelecionado);
}

</script>
<template>
  <div class="container-register">
    <div class="min-container-register">
      <div style="display:flex;gap: 20px;align-items: center;">
        <button @click="criaUser">Criar User</button>

        <div v-if="plano !== 'prime' && plano !== 'plus'" class="right-card-no-plan">
          <!-- <div class="plan-plus">
            <h2>Escolha seu plano</h2>
            <span>Por apenas <b>R$ 9,99</b></span>
            <div class="right-card-options">
              <button @click="atualizaPlano('prime')">&#10022; Assinar Prime &#10022;</button>
            </div>
            <br>
            <span>Por apenas <b>R$ 4,99</b></span>
            <div class="right-card-options">
              <button @click="atualizaPlano('plus')">&#10022; Assinar Plus &#10022;</button>
            </div>
            <br>
             <div class="right-card-options">
              <button @click="atualizaPlano('plus')">&#10022; Entre em contato &#10022;</button>
            </div>
             <img src="" alt="compra-segura" width="200"/>
          </div> -->
          <div class="plan-plus">
            <h2>&#10022; Plano Plus &#10022;</h2>
            <p class="destak">Mais escolhido - <b>R$ 4,99</b></p>
            <div class="plan-options">
              <p>&#10022; (+5 dias) após assinatura</p>
              <p>&#10022; mensagem de destaque</p>
              <p>&#10022; 5 links disponíveis</p>
              <p>&#10022; escolha de gêneros</p>
              <p>&#10022; templates do Plus</p>
              <p>&#10022; foto de perfil</p>
              <button @click="atualizaPlano('plus')">&#10022; Assinar PLUS &#10022;</button>
            </div>
          </div>

          <div class="plan-prime">
            <h2>&#10022; Plano Prime &#10022;</h2>
            <p class="destak">Mais escolhido - <b>R$ 9,99</b></p>
            <div class="plan-options-prime">
              <p>&#10022; Dashboard (mini-website)</p>
              <p>&#10022; mensagem de destaque</p>
              <p>&#10022; escolha de gêneros</p>
              <p>&#10022; todos os templates</p>
              <p>&#10022; 10 links disponíveis</p>
              <p>&#10022; GIF para perfil</p>
              <button @click="atualizaPlano('prime')">&#10022; Assinar PRIME &#10022;</button>
            </div>
          </div>

          <!-- <div>
            <h2>Escolha seu plano</h2>
            <span>Por apenas <b>R$ 9,99</b></span>
            <div class="right-card-options">
              <button @click="atualizaPlano('prime')">&#10022; Assinar Prime &#10022;</button>
            </div>
            <br>
            <span>Por apenas <b>R$ 4,99</b></span>
            <div class="right-card-options">
              <button @click="atualizaPlano('plus')">&#10022; Assinar Plus &#10022;</button>
            </div>
            <br>
             <div class="right-card-options">
              <button @click="atualizaPlano('plus')">&#10022; Entre em contato &#10022;</button>
            </div>
          </div> -->
        </div>
        <form v-else @submit.prevent="userRegister">
          <h2>Registre sua conta</h2>
          <div>
            <label>Email</label>
            <input id="email" v-model="email" type="email" name="email" placeholder="Seu e-mail" required>
          </div>
          <div>
            <label for="username">Username</label>
            <input id="username" v-model="username" type="text" name="username" placeholder="Seu username" required>
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" name="password" placeholder="Sua senha" required>
          </div>
          <div>
            <label for="confirmPassword">Confirm password</label>
            <input id="confirmPassword" v-model="confirmPassword" type="password" name="confirmPassword"
              placeholder="Confirmar senha" required>
          </div>
          <button type="submit">&#10022; Comprar agora &#10022;</button>
          <div style="display:flex;align-items:center;margin:10px 0;justify-content: center;gap: 5px;">
            <p>Já possui uma conta ?</p>
            <nuxt-link to="/login" style="color:#721c24;font-weight: 600;">Login</nuxt-link>
          </div>
          <!-- <span>Plano selecionado: {{ plano }}</span>
          <span v-if="erro">{{ erro }}</span> -->
        </form>
        <div v-if="plano === 'plus'" class="right-card">
          <div>
            <h2>Você está garantindo</h2>
            <span>Por apenas <b>R$ 4,99</b></span>
            <div class="right-card-options">
              <p>&#10022; (+5 dias) após assinatura</p>
              <p>&#10022; mensagem de destaque</p>
              <p>&#10022; 5 links disponíveis</p>
              <p>&#10022; escolha de gêneros</p>
              <p>&#10022; templates do Plus</p>
              <p>&#10022; foto de perfil</p>
              <button @click="atualizaPlano('prime')">Trocar para Prime &#10095;</button>
            </div>
          </div>
        </div>
        <div v-if="plano === 'prime'" class="right-card">
          <div>
            <h2>Você está garantindo</h2>
            <span>Por apenas <b>R$ 9,99</b></span>
            <div class="right-card-options">
              <p>&#10022; Dashboard (mini-website)</p>
              <p>&#10022; mensagem de destaque</p>
              <p>&#10022; escolha de gêneros</p>
              <p>&#10022; todos os templates</p>
              <p>&#10022; 10 links disponíveis</p>
              <p>&#10022; GIF para perfil</p>
              <p>&#10022; veja perfis vinculados <span style="font-size:10px;">bônus</span></p>
              <button @click="atualizaPlano('plus')">Trocar para Plus &#10095;</button>
            </div>
          </div>
        </div>

      </div>

      <div style="color: #f3dddd;text-align: right;padding: 5px;font-size: 12px;">
        © todos os direitos reservados de likemy.me
      </div>
    </div>



    <!-- <AppNotification
      v-model:show="showComponent"
      :message="notificationMessage"
      :type="notificationType"
      :duration="3000"
    /> -->
  </div>
</template>

<style scoped>
.right-card-no-plan {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  gap: 20px;
}



.plan-plus {
  background-color: #73132a;
  width: 300px;
  border-radius: 20px;
  color: #fff;
  padding: 15px;
  text-align: center;
}

.plan-plus h2 {
  font-size: 24px;
  color: #fff;
}

.plan-plus .destak {
  font-size: 18px;
  color: #f8d7da;
  background-color: #ff1d53;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0;
}

.plan-plus .destak b {
  color: #fcfcfc;
  background: #73132a;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 16px;
}

.plan-prime h2 {
  font-size: 24px;
  color: #73132a;
}

.plan-prime .destak {
  font-size: 18px;
  color: #f8d7da;
  background-color: #73132a;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0;
}

.plan-prime .destak b {
  color: #fcfcfc;
  background: #ff1d53;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 16px;
}

.plan-prime {
  width: 300px;
  border-radius: 20px;
  border: 2px solid #73132a;
  padding: 15px;
  text-align: center;
}

.plan-options {
  text-align: start;
  width: max-content;
  margin: 0 auto;
  color: #f8d7da;
  display: grid;
  gap: 20px;
}

.plan-options-prime {
  text-align: start;
  width: max-content;
  margin: 0 auto;
  color: #f3dddd;
  display: grid;
  gap: 20px;
}

.plan-options button {
  background-color: #f8d7da;
  color: #73132a;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.plan-options-prime button {
  background-color: #73132a;
  color: #f8d7da;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.right-card {
  text-align: center;
  background-color: #721c24;
  border-radius: 20px;
  box-shadow: 5px 5px 1px 0px #f3dddd;
  height: max-content;
  min-width: 260px;
}

.right-card h2 {
  font-size: 20px;
  color: #f3dddd;
  margin: 20px;
}

.right-card-options {
  text-align: start;
  width: max-content;
  color: #f8d7da;
  display: grid;
  gap: 20px;
  margin: 20px auto 20px auto;
}

.right-card-options p {
  font-size: 14px;
}

.right-card span {
  color: #fcfcfc;
  background: #ff1d53;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 16px;
}

.right-card span b {
  color: #fcfcfc;
  background: #73132a;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 14px;
}

.right-card-options button {
  background-color: #f8d7da;
  color: #73132a;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.container-register {
  background-color: #f3dddd;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
}

.min-container-register {
  background-color: #ff1d53;
  color: #fff;
  padding: 20px;
  border-radius: 50px 100px 50px 100px;
  display: grid;
  gap: 20px;
  transition: 0.3s;
}

.min-container-register:hover {
  border-radius: 50px;
}

.min-container-register form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  font-size: 14px;
}

.min-container-register form h2 {
  color: #73132a;
  margin: 20px 0;
}

.min-container-register form {
  color: #73132a;
  font-size: 14px;
}

.min-container-register form button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  color: #ff1d53;
  cursor: pointer;
  margin: 10px 0;
}
</style>