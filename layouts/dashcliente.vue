<template>
  <div v-if="authLoaded" class="dashboard-layout">
    <aside :class="{ collapsed: isCollapsed }" class="sidebar">
      <div class="side-top">
        ACESSO CLIENTE
        <!-- role {{ role }} -->
        <!-- <button @click="toggleMenu">
          <span v-if="isCollapsed">open</span>
          <span v-else>close</span>
        </button> -->
      </div>
      <NuxtLink to="/cliente" :class="{ active: isActive('/cliente') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span>Dashboard cliente</span>
      </NuxtLink>
      <NuxtLink to="/premios-retirada" :class="{ active: isActive('/premios-retirada') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span>Meus prêmios</span>
      </NuxtLink>
      <NuxtLink to="/premios-roleta" :class="{ active: isActive('/premios-roleta') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span>Roleta</span>
      </NuxtLink>
      <NuxtLink to="/catalogo" :class="{ active: isActive('/catalogo') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span>Catálogo</span>
      </NuxtLink>
      <!-- <NuxtLink to="/cliente" :class="{ active: isActive('/cliente') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span v-if="!isCollapsed">Dashboard cliente</span>
      </NuxtLink>
      <NuxtLink to="/premios" :class="{ active: isActive('/premios') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span v-if="!isCollapsed">Premios</span>
      </NuxtLink> -->

      <!-- <button @click="testToastify">Click me</button> -->

      <!-- <NuxtLink to="/products" :class="{ active: isActive('/products') }">
        <img src="../assets/images/box-icon.svg" />
        <span v-if="!isCollapsed">Produto</span>
      </NuxtLink>
      <NuxtLink to="/clients" :class="{ active: isActive('/clients') }">
        <img src="../assets/images/peoples-icon.svg" />
        <span v-if="!isCollapsed">Clientes</span>
      </NuxtLink>
      <NuxtLink to="/brands" :class="{ active: isActive('/brands') }">
        <img src="../assets/images/brand-icon.svg" />
        <span v-if="!isCollapsed">Marcas</span>
      </NuxtLink>
      <NuxtLink to="/banners" :class="{ active: isActive('/banners') }">
        <img src="../assets/images/banner-icon.svg" />
        <span v-if="!isCollapsed">Banners</span>
      </NuxtLink>
      <NuxtLink to="/sales" :class="{ active: isActive('/sales') }">
        <img src="../assets/images/sales-icon.svg" />
        <span v-if="!isCollapsed">Vendas</span>
      </NuxtLink>
      <NuxtLink to="/newaccess" :class="{ active: isActive('/newaccess') }">
        <img src="../assets/images/newaccess-icon.svg" />
        <span v-if="!isCollapsed">Novo acesso</span>
      </NuxtLink>
      <NuxtLink to="/settings" :class="{ active: isActive('/settings') }">
        <span v-if="!isCollapsed">Configurações</span>
      </NuxtLink>
      <NuxtLink to="/migrate" :class="{ active: isActive('/migrate') }">
        <span>&#9729;</span>
        <span v-if="!isCollapsed">Migrate</span>
      </NuxtLink>
      <NuxtLink
        to="/dashboard/config"
        :class="{ active: isActive('/dashboard/config') }"
      >
        <span>&#9729;</span>
        <span v-if="!isCollapsed">Configurações</span>
      </NuxtLink>
      <NuxtLink to="/payments" :class="{ active: isActive('/payments') }">
        <span>&#9729;</span>
        <span v-if="!isCollapsed">Pagamentos</span>
      </NuxtLink>
      <NuxtLink
        to="/dashboard/options"
        :class="{ active: isActive('/dashboard/options') }"
      >
        <span>&#9729;</span>
        <span v-if="!isCollapsed">Opções</span>
      </NuxtLink> -->
      <button @click="handleLogout" :disabled="isLoading">
        <span v-if="!isLoading">Sair</span>
        <span v-else>Saindo...</span>
      </button>
    </aside>

    <aside :class="{ collapsed: isCollapsed }" class="sidebottom">
      <NuxtLink to="/cliente" :class="{ active: isActive('/cliente') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span>Home</span>
      </NuxtLink>
      <NuxtLink to="/premios-retirada" :class="{ active: isActive('/premios-retirada') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span>Prêmios</span>
      </NuxtLink>
      <NuxtLink to="/premios-roleta" :class="{ active: isActive('/premios-roleta') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span>Roleta</span>
      </NuxtLink>
      <NuxtLink to="/catalogo" :class="{ active: isActive('/catalogo') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span>Catálogo</span>
      </NuxtLink>
      <!-- <NuxtLink to="/cliente" :class="{ active: isActive('/cliente') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span v-if="!isCollapsed">Dashboard cliente</span>
      </NuxtLink>
      <NuxtLink to="/premios" :class="{ active: isActive('/premios') }">
        <img src="../assets/images/dashboard-icon.svg" />
        <span v-if="!isCollapsed">Premios</span>
      </NuxtLink> -->

      <!-- <button @click="testToastify">Click me</button> -->

      <!-- <NuxtLink to="/products" :class="{ active: isActive('/products') }">
        <img src="../assets/images/box-icon.svg" />
        <span v-if="!isCollapsed">Produto</span>
      </NuxtLink>
      <NuxtLink to="/clients" :class="{ active: isActive('/clients') }">
        <img src="../assets/images/peoples-icon.svg" />
        <span v-if="!isCollapsed">Clientes</span>
      </NuxtLink>
      <NuxtLink to="/brands" :class="{ active: isActive('/brands') }">
        <img src="../assets/images/brand-icon.svg" />
        <span v-if="!isCollapsed">Marcas</span>
      </NuxtLink>
      <NuxtLink to="/banners" :class="{ active: isActive('/banners') }">
        <img src="../assets/images/banner-icon.svg" />
        <span v-if="!isCollapsed">Banners</span>
      </NuxtLink>
      <NuxtLink to="/sales" :class="{ active: isActive('/sales') }">
        <img src="../assets/images/sales-icon.svg" />
        <span v-if="!isCollapsed">Vendas</span>
      </NuxtLink>
      <NuxtLink to="/newaccess" :class="{ active: isActive('/newaccess') }">
        <img src="../assets/images/newaccess-icon.svg" />
        <span v-if="!isCollapsed">Novo acesso</span>
      </NuxtLink>
      <NuxtLink to="/settings" :class="{ active: isActive('/settings') }">
        <span v-if="!isCollapsed">Configurações</span>
      </NuxtLink>
      <NuxtLink to="/migrate" :class="{ active: isActive('/migrate') }">
        <span>&#9729;</span>
        <span v-if="!isCollapsed">Migrate</span>
      </NuxtLink>
      <NuxtLink
        to="/dashboard/config"
        :class="{ active: isActive('/dashboard/config') }"
      >
        <span>&#9729;</span>
        <span v-if="!isCollapsed">Configurações</span>
      </NuxtLink>
      <NuxtLink to="/payments" :class="{ active: isActive('/payments') }">
        <span>&#9729;</span>
        <span v-if="!isCollapsed">Pagamentos</span>
      </NuxtLink>
      <NuxtLink
        to="/dashboard/options"
        :class="{ active: isActive('/dashboard/options') }"
      >
        <span>&#9729;</span>
        <span v-if="!isCollapsed">Opções</span>
      </NuxtLink> -->

      
      <!-- <button @click="handleLogout" :disabled="isLoading">
        <span v-if="!isLoading">Sair</span>
        <span v-else>Saindo...</span>
      </button> -->
    </aside>


    <main :class="{ forceWidth: isCollapsed }">
      <div class="nav-sec">
        <div v-if="false" class="btn-menu">
          <div @click="toggleMenu">
            <img v-if="isCollapsed" src="../assets/images/set-icon.svg" />
            <img v-else src="../assets/images/set1-icon.svg" />
          </div>
        </div>

        <pre>{{ cliente.user_metadata.nome }}</pre>

        <div>
          <img src="https://www.if.ufrgs.br/if/wp-content/uploads/2018/04/default-profile.png"
            alt="Drogaria Popular do Pará" class="logo" width="40">
        </div>
      </div>
      <slot />
    </main>
  </div>
  <div v-else class="loading-auth">
    <div class="spinner"></div>
    <p>Verificando autenticação...</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";

const supaStore = useSupabaseClient();
const SUPABASE_URL = supaStore.supabaseUrl;
const SUPABASE_KEY = supaStore.supabaseKey;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const isCollapsed = ref(false);
const route = useRoute();
const authLoaded = ref(false);

const cliente = ref(null);

const role = ref("cliente"); // Defina o papel padrão como 'admin'

// Verificação de autenticação
const checkAuth = async () => {
  try {
    // 1. Verifica no localStorage (client-side)
    const authData = localStorage.getItem("sb-api-auth-token");
    const parsedData = JSON.parse(authData);

    console.log("parsedData CLIENTE!", parsedData);
    cliente.value = parsedData.user;
    // role.value = user.user_metadata.role;
    if (parsedData.user.user_metadata.role) {
      navigateTo("/cliente");
      // navigateTo('/dashboard');
    } else {
      navigateTo("/dashboard");
    }

    if (process.client) {
      ("sb-api-auth-token");
      if (!authData) throw new Error("Nenhum dado de autenticação encontrado");
      if (!parsedData?.user) throw new Error("Usuário não autenticado");
    }

    // 2. Verifica com o Supabase (opcional, mas recomendado)
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw error || new Error("Usuário não autenticado");
    }

    // role.value = user.user_metadata.role;
    // if (user.user_metadata.role !== 'admin') {
    //   navigateTo('/cliente');
    //   // navigateTo('/dashboard');
    // }

    // Se chegou aqui, está autenticado
    authLoaded.value = true;
  } catch (error) {
    console.error("Erro de autenticação:", error);

    // Limpa os dados inválidos
    if (process.client) {
      localStorage.removeItem("sb-api-auth-token");
    }

    // Redireciona para login
    // navigateTo('/login');
  }
};

function testToastify() {
  useToastify("Wow so easy !", {
    autoClose: 2000,
    theme: "light",
    type: "success",
    position: ToastifyOption.POSITION.TOP_RIGHT,
  });
}

// Verifica a autenticação quando o componente é montado
onMounted(() => {
  checkAuth();
});

function toggleMenu() {
  isCollapsed.value = !isCollapsed.value;
}

const isActive = (path) => {
  return route.path.startsWith(path);
  return navigateTo(path);
};

const isLoading = ref(false);

const handleLogout = async () => {
  // console.log("Logout clicked");
  isLoading.value = true;
  try {
    await supabase.auth.signOut();
    localStorage.removeItem("sb-api-auth-token");
    useToastify("Logout realizado com sucesso!", {
      autoClose: 2000,
      theme: "light",
      type: "success",
      position: ToastifyOption.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      // Redireciona para a página de login após o logout
      navigateTo("/login");
    }, 2000);
    // navigateTo("/login");

  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.loading-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #ff1d53;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.dashboard-layout {
  display: flex;
}

.side-top {
  padding: 30px;
  display: flex;
  justify-content: center;
  background-color: #e30614;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 0px 0px #b40303;
}

.btn-menu {
  /* background-color: red; */
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  bottom: 0;
}

.btn-menu>div>img {
  cursor: pointer;
}

.sidebottom {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-color: #fff;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 250px;
  min-width: 250px;
  box-shadow: 0 0 1px 1px #eeeeee;
  background-color: #fff;
  padding: 20px;
  transition: width 0.3s ease;
}

.sidebar a {
  text-decoration: none;
  border-radius: 50px;
  align-items: center;
  border-radius: 4px;
  padding: 10px;
  font-weight: bold;
  color: #4c4c4c;
  display: flex;
  gap: 5px;
  font-weight: 100;
  border-left: 5px solid transparent;
}

.sidebar a:hover {
  color: #acacac;
}

.sidebar.collapsed {
  width: 80px;
}

main {
  flex-grow: 1;
  transition: margin-left 0.3s ease;
  overflow-y: scroll;
  height: 100vh;
}

main.forceWidth {
  /* margin-left: 60px; */
}

main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track {
  background: transparent;
}

main::-webkit-scrollbar-thumb {
  background-color: #b9b28a;
  border-radius: none;
  border: none;
}

.nav-sec {
  box-shadow: 0 0 1px 1px #eeeeee;
  background-color: #fff;
  padding: 15px;
  text-align: center;
  position: sticky;
  top: 0;
  overflow: hidden;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active {
  /* background-color: #504B38; */
  text-decoration: none;
  align-items: center;
  border-radius: 0px;
  font-weight: bold;
  color: #000 !important;
  /* border-left: 5px solid #B9B28A !important; */
  background-color: #e6e6e6;
  display: flex;
  gap: 5px;
}



/* media */

@media (max-width: 900px) {

  main {
    overflow-y: hidden;
    /* background-color: red; */
  }

  .sidebottom {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10%;
    background-color: #e30614;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
  }

  a {
    display: grid;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    gap: 5px;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
  }

  a img {
    margin: 0 auto;
    width: 20px;
  }

  .active {
    text-decoration: none;
    align-items: center;
    border-radius: 0px;
    font-weight: bold;
    color: #000 !important;
    background-color: #e6e6e6;
    display: grid;
    padding: 5px;
    border-radius: 5px;
  }

  .sidebar {
    background-color: red;
    width: 100%;
    position: fixed;
    z-index: 99;
    height: 100%;
    display: none;
  }

  .sidebar.collapsed {
    width: 100%;
    /* display: block; */
  }
}
</style>
