<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'mobile'
});

import { ref, onMounted } from 'vue'
import { createClient } from "@supabase/supabase-js";

const supaStore = useSupabaseClient();
const SUPABASE_URL = supaStore.supabaseUrl;
const SUPABASE_KEY = supaStore.supabaseKey;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const dataUser = ref(null)

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  dataUser.value = data.user
  console.log('User:', dataUser.value)
  // return user
}

onMounted(() => {
  console.log('User:', getUser())
})

// Dados do usuário mockados (em uma aplicação real, viriam de uma API)
const user = ref({
  name: 'Maria Silva',
  username: '@mariasilva',
  email: 'maria.silva@email.com',
  cpf: '123.456.789-00',
  profileImage: null
})

// Estado para controlar o toggle do Face ID / Touch ID
const isBiometricEnabled = ref(false)

// Função para fazer logout
const handleLogout = async () => {
  console.log('Logout realizado')
  const { error } = await supabase.auth.signOut();
  const token = useCookie('sb-user-cookie');
  token.value = null;
  navigateTo('/');
  // Aqui você implementaria a lógica de logout
  // Por exemplo: redirecionamento para a página de login
}

// Função para editar o perfil
const editProfile = () => {
  console.log('Editar perfil')
  // Aqui você implementaria a navegação para a tela de edição de perfil
}

// Funções para navegar para as diferentes seções
const navigateToMyAccount = () => {
  console.log('Navegando para Minha Conta')
}

const navigateToSavedAddresses = () => {
  console.log('Navegando para Endereços Salvos')
}

const navigateToTwoFactor = () => {
  console.log('Navegando para Autenticação de Dois Fatores')
}

// Função para alternar o estado do Face ID / Touch ID
const toggleBiometric = () => {
  isBiometricEnabled.value = !isBiometricEnabled.value
  console.log('Biometria ' + (isBiometricEnabled.value ? 'ativada' : 'desativada'))
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-content">
      <h1 class="profile-title">Perfil</h1>
      <!-- Card do perfil -->
      <div class="profile-card">
        <div class="profile-info">
          <div class="avatar">
            <img 
              v-if="user.profileImage" 
              :src="user.profileImage" 
              alt="Foto de perfil"
            >
            <div v-else class="avatar-placeholder">
              {{ user.name.charAt(0) }}
            </div>
          </div>
          <div class="user-details">
            <h2>{{dataUser?.user_metadata.empresa}}</h2>
            <p>{{dataUser?.user_metadata.email}}</p>
          </div>
        </div>
        <button @click="editProfile" class="edit-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
        </button>
      </div>
      
      <!-- Lista de opções -->
      <div class="settings-list">
        <!-- Minha Conta -->
        <div class="settings-item" @click="navigateToMyAccount">
          <div class="settings-icon user-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="settings-text">
            <h3>Minha Conta</h3>
            <p>Faça alterações nos seus dados pessoais</p>
          </div>
          <div class="settings-alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e30613" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div class="chevron">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </div>
        
        <!-- Endereços Salvos -->
        <div class="settings-item" @click="navigateToSavedAddresses">
          <div class="settings-icon address-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div class="settings-text">
            <h3>Endereços Salvos</h3>
            <p>Gerencie seus endereços de entrega</p>
          </div>
          <div class="chevron">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </div>
        
        <!-- Face ID / Touch ID -->
        <div class="settings-item">
          <div class="settings-icon biometric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <div class="settings-text">
            <h3>Face ID / Touch ID</h3>
            <p>Gerencie a segurança do seu dispositivo</p>
          </div>
          <div class="toggle-switch" @click="toggleBiometric">
            <div class="toggle-track" :class="{ 'active': isBiometricEnabled }">
              <div class="toggle-thumb"></div>
            </div>
          </div>
        </div>
        
        <!-- Autenticação de Dois Fatores -->
        <div class="settings-item" @click="navigateToTwoFactor">
          <div class="settings-icon security-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div class="settings-text">
            <h3>Autenticação de Dois Fatores</h3>
            <p>Aumente a segurança da sua conta</p>
          </div>
          <div class="chevron">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </div>
        
        <!-- Sair -->
        <div class="settings-item logout" @click="handleLogout">
          <div class="settings-icon logout-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <div class="settings-text">
            <h3>Sair</h3>
            <p>Encerrar sessão na sua conta</p>
          </div>
          <div class="chevron">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.profile-content {
  max-width: 600px;
  margin: 0 auto;
}

.profile-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.profile-card {
  background-color: #003399;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e30613;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-details h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.user-details p {
  font-size: 14px;
  margin: 5px 0 0;
  opacity: 0.8;
}

.edit-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.settings-list {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.settings-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  position: relative;
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-item:hover {
  background-color: #f9f9f9;
}

.settings-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: #666;
}

.settings-text {
  flex: 1;
}

.settings-text h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.settings-text p {
  font-size: 13px;
  color: #888;
  margin: 4px 0 0;
}

.settings-alert {
  margin-right: 10px;
}

.chevron {
  color: #ccc;
}

.toggle-switch {
  margin-left: 10px;
}

.toggle-track {
  width: 50px;
  height: 30px;
  background-color: #ddd;
  border-radius: 15px;
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer;
}

.toggle-track.active {
  background-color: #003399;
}

.toggle-thumb {
  width: 26px;
  height: 26px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.toggle-track.active .toggle-thumb {
  transform: translateX(20px);
}

.logout-icon {
  color: #e30613;
}

@media (max-width: 480px) {
  .profile-container {
    padding: 15px;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .user-details h2 {
    font-size: 16px;
  }
  
  .user-details p {
    font-size: 12px;
  }
  
  .settings-text h3 {
    font-size: 15px;
  }
  
  .settings-text p {
    font-size: 12px;
  }
}
</style>