<template>
  <div class="main-container">
    <div style="padding:20px;">
      <div class="top-header">
        <div>
          <h2>like<b style="color:#73132a">MY</b>.me</h2>
        </div>
        <div>
          <p style="color:#73132a">&#10022; Uma nova forma de encontrar você &#10022;</p>
        </div>
        <div class="nav-links">
          <NuxtLink to="/login">Login</NuxtLink> |
          <NuxtLink to="/register">Register <b style="color:#ff1d53">now</b></NuxtLink>
        </div>
      </div>
      <div class="medium-section">
        <div style="display:grid;gap:10px;">
          <h1>Sua Bio com <u style="color:#ff1d53">likemy.me</u></h1>
          <a>likemy.me/leocastro</a>
          <p>Em breve likemy - website</p>
        </div>
        <div>
          <!-- <img src="../public/favicon.ico" alt="Logo" width="250"> -->
        </div>
      </div>
      <div class="container-plans">
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
            <button @click="selecionarPlano('plus')">Assinar PLUS &#10022;</button>
          </div>
        </div>
        <div class="plan-prime">
          <h2>&#10022; Plano Prime &#10022;</h2>
          <p class="destak">Mais benefícios - <b>R$ 9,99</b></p>
          <div class="plan-options-prime">
            <p>&#10022; Dashboard (mini-website)</p>
            <p>&#10022; mensagem de destaque</p>
            <p>&#10022; escolha de gêneros</p>
            <p>&#10022; todos os templates</p>
            <p>&#10022; 10 links disponíveis</p>
            <p>&#10022; GIF para perfil</p>
            <button @click="selecionarPlano('prime')">Assinar PRIME &#10022;</button>
          </div>
        </div>
      </div>
    </div>
     <div v-if="showHelp" class="help">
      <p>Estou com receio</p>
      <p>Fale com criador do projeto</p>
    </div>
    <!-- <audio ref="popupSound" src="../../assets/sound/bubble.mp3"/> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'nuxt/app';
const router = useRouter()
const showHelp = ref(false);
const popupSound = ref(null);

onMounted(() => {
  setTimeout(() => {
    showHelp.value = true;
    if (popupSound.value) {
      popupSound.value.play();
    }
  }, 2000);
});

const selecionarPlano = (plano) => {
  // console.log('Plano selecionado:', plano);
  router.push({
    name: 'register',
    query: { plano: plano }
  })
}
</script>

<style scoped>

.main-container {
  background-color: #f3dddd;
}

.top-header {
  background-color: #FF1D53;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 20px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1000;
  height: 80px;
  display: flex;
  color: #FFF;
}

.medium-section {
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 60px auto;
  padding: 20px;
  display: flex;
}

.medium-section a {
  border-radius: 20px 0 20px 0;
  background-color: #ff1d53;
  padding: 10px 15px;
  width: fit-content;
  transition: 0.3s;
  color: #fff;
  cursor: pointer;
}

.container-plans {
  justify-content: space-evenly;
  align-items: center;
  max-width: 1200px;
  margin: 60px auto;
  padding: 20px;
  display: flex;
}

.container-plans .plan-plus {
  background-color: #ff1d53;
  width: 300px;
  border-radius: 20px;
  color: #fff;
  padding: 15px;
  text-align: center;
}

.container-plans .plan-plus h2 {
  font-size: 24px;
  color: #73132a;
}

.container-plans .plan-prime h2 {
  font-size: 24px;
  color: #73132a;
}

.container-plans .plan-prime .destak {
  font-size: 18px;
  color: #f8d7da;
  background-color: #ff1d53;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0;
}

.container-plans .plan-plus .destak {
  font-size: 18px;
  color: #f8d7da;
  background-color: #73132a;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0;
}

.container-plans .plan-plus .destak b {
  color: #fcfcfc;
  background: #ff1d53;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 16px;
}

.container-plans .plan-prime .destak b {
  color: #fcfcfc;
  background: #73132a;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 16px;
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
  color: #73132a;
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

.container-plans .plan-prime {
  width: 300px;
  border-radius: 20px;
  border: 2px solid #73132a;
  padding: 15px;
  text-align: center;
}

.medium-section a:hover{
  border-radius: 0 20px 0 20px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #f8d7da;
  text-decoration: none;
  font-size: 18px;
  transition: 0.3s;
  cursor: pointer;
}

.nav-links a:hover {
  background-color: #73132a;
  color: #f8d7da;
  padding: 10px 20px;
  border-radius: 10px;
}

.help {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff1d53;
  color: #f8d7da;
  padding: 15px;
  border-radius: 20px;
}

</style>