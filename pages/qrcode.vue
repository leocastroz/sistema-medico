<template>
  <div class="container">
    <div class="main-content">
      <div class="main-text">

        <!-- <div v-if="true"> -->
        <div v-if="tokenFound">
          <!-- <scan /> -->
          <div style="display: grid;gap: 20px;">
            <p style="color: #fff;font-size: 35px;font-weight: 700;">Estamos aguardando sua autenticação</p>
            <p style="color: #fff;font-size: 20px;font-weight: 500;text-align: left;">✅ Preencha seus dados em seu smartphone para validar seu cadastro</p>
            <p style="color: #fff;font-size: 20px;font-weight: 500;text-align: left;">✅ Caso já possua cadastro, você será redirecionado</p>
          </div>
          <img src="../assets/images/authface.gif" alt="Logo DPP" width="150" style="margin-top: 30px;filter: drop-shadow(2px 4px 6px black);" />
          <!-- <button @click="restartProcess">Reiniciar Processo</button> -->
          <div style="background-color: red">
            {{ userDataAutenticado }}
          </div>
        </div>


        <!-- <div v-if="false" style="display: grid;gap: 20px;"> -->
        <div v-else style="display: grid;gap: 20px;">
          <img src="../assets/images/titulo-ganhadores.png" alt="ganhadores" width="200" style="margin: 0 auto;" />

          <img src="../assets/images/ganhador1.png" alt="QR Code" width="280" />

        </div>

      </div>
      <img src="../assets/images/menina.png" alt="imagem" width="350" class="menina" />
      <img src="../assets/images/popularcard.png" alt="imagem" width="300" class="popularcard" />
   
    </div>

    <div class="footer">
      <img v-if="!tokenFound" :src="qrCodeUrl" alt="QR Code" width="150" class="qr-code" />

      <div>
        <div v-if="tokenFound">
          <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-05-37_512.gif" width="250" />
          <div class="escanear-qrcode">
            Atenção, seu tempo <span class="time">{{ formattedTime }} </span> para realizar o cadastro
          </div>
        </div>
        <p v-else class="escanear-qrcode">Escaneie o Qrcode e ganhe prêmios <img src="https://giphy-teste.vercel.app/assets/confetti-8199bde4.gif" width="40" /></p>
      </div>


      <img src="../assets/images/drogariapopular.png" alt="Logo DPP" width="250" style="margin: 0 auto;" />
    </div>




    <div class="site" style="display: flex;align-items: center;justify-content: space-around;">
      <p>populardopara.com</p>
      <p style="font-size: 12px;">© todos os direitos reservados de Drogaria Popular Do Pará</p>
    </div>
  </div>
</template>

<script setup>
import { useUserData } from "@/composables/useUserData";
import scan from "./scan.vue";
import { ref, onMounted, watch } from "vue";
import { createClient } from "@supabase/supabase-js";

const userData = useUserData();
const qrCodeUrl = ref("");
const userDataAutenticado = ref(null);
const tokenFound = ref(false);
// const tokenValue = ref("");
// const totalSeconds = ref(180); // 3 minutos em segundos
const totalSeconds = ref(180); // 30 segundos
const formattedTime = ref("");
const tokenExists = ref("");
const containUser = ref(null);
let intervalId = null;
let validateAutenticado = null;
const userAutenticado = ref(false);

const supaStore = useSupabaseClient();
const SUPABASE_URL = supaStore.supabaseUrl;
const SUPABASE_KEY = supaStore.supabaseKey;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// let token = generateToken();

function generateToken() {
  return Math.random().toString(36).substring(7);
}

function updateFormattedTime() {
  const minutes = Math.floor(totalSeconds.value / 60);
  const seconds = totalSeconds.value % 60;
  formattedTime.value = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startCountdown() {
  const interval = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
      updateFormattedTime();
    } else {
      clearInterval(interval); // Para o contador quando chegar a 0
      window.location.reload();
    }
  }, 1000); // Atualiza a cada segundo
}

async function generateQRCode() {
  let token = generateToken();
  const url = `${window.location.origin}/cadastro?token=${token}`;
  qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    url
  )}`;
  console.log("QR Code gerado:", qrCodeUrl.value);
  console.log("Token gerado: ->", token);

  intervalId = setInterval(async () => {
    if (tokenFound.value) return;

    // Real Time Table Supabase
    console.log("Verificando token no Supabase...");
    const changes = supabase.channel('sorteio_qrcode').on('postgres_changes',
      {
        schema: 'public',
        event: 'INSERT',
        // event: '*',
      },
      (payload) => {
        tokenExists.value = payload.new;
      }
    ).subscribe()


    if (tokenExists.value.token) {
      console.log("Token tokenExists:", tokenExists.value);
      tokenFound.value = true;
      startCountdown();
      const changes = supabase.channel('sorteio_qrcode').on('postgres_changes',
        {
          schema: 'public',
          event: 'UPDATE',
          // event: '*',
        },
        (payload) => {
          containUser.value = payload.new;
          console.log("UPDATE DADOS ppp -->:", containUser.value);
          console.log("UPDATE DADOS YYY -->:", payload.new);

          userAutenticado.value = true;
          userDataAutenticado.value = containUser.value.user_data;

          setTimeout(() => {
            console.log("CAINDO AQUI PARA CHAMAR:");
            userData.value = userDataAutenticado.value;
            // router.push("/roleta");
            navigateTo('/roleta');
            console.log("Dados enviados para o estado global:", userData.value);
          }, 10000);
        }
      ).subscribe()
      clearInterval(intervalId);
    } else {
      // restartProcess();
      tokenFound.value = false;
    }
  }, 5000);


}

function restartProcess() {
  tokenFound.value = false;
  // generateQRCode();
}
onMounted(() => {
  // startCountdown();
  generateQRCode();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.menina {
  display: block;
  left: -55px;
  position: absolute;
}

.time {
  background-color: red;
  padding: 5px 10px;
  border-radius: 20px;
}

.escanear-qrcode {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  background-color: #001a61;
  padding: 10px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.popularcard {
  display: block;
  right: 100px;
  margin: 0 0 80px 0;
  position: absolute;
}

.site {
  text-align: center;
  background: red;
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

/* Conteúdo principal que ocupa todo o espaço disponível */
.main-content {
  flex: 1;
  display: grid;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  /* padding: 0 20px; */
  background-image: url(/_nuxt/assets/images/background.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Texto centralizado no conteúdo principal */
.main-text {
  max-width: 600px;
  font-size: 24px;
  height: 100%;
  padding: 40px 0 20px 0;
}

/* Footer menor na parte inferior */
.footer {
  height: 100px;
  /* Altura fixa para o footer */
  /* background-color: #002CA1; */
  background-image: url(/_nuxt/assets/images/backgroundblue.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: grid;
  justify-content: center;
  /* gap: 20px; */
  align-items: center;
  text-align: center;
  padding: 0 20px;
}

.footer .qr-code {
  background: #fefefe;
  padding: 15px;
  border-radius: 20px;
  width: 250px;
  margin: 0 auto;
  box-shadow: 10px 10px 10px #011b64;
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

/* Texto do footer */
.footer-text {
  font-size: 18px;
  color: #444;
}

/* Responsividade para telas menores */
@media (max-width: 768px) {
  .main-text {
    font-size: 20px;
  }

  .footer {
    height: 500px;
  }

  .footer-text {
    font-size: 16px;
  }
}

/* Responsividade para telas muito pequenas */
@media (max-width: 480px) {
  .main-text {
    font-size: 18px;
  }

  .footer {
    height: 200px;
  }

  .footer-text {
    font-size: 14px;
  }
}





/* 

*/
</style>
