<template>
  <div class="scanner-container">
    <div class="scanner-frame">
      <!-- Cantos arredondados -->
      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>
      
      <!-- Elementos faciais -->
      <!-- <div class="face-elements">
        <div class="eye left-eye"></div>
        <div class="eye right-eye"></div>
        <div class="nose"></div>
        <div class="mouth"></div>
      </div> -->
      
      <!-- Linha de scan -->
      <div class="scan-line" :class="{ scanning: isScanning }"></div>
      
      <!-- Status -->
      <div class="status-text" :class="{ success: scanComplete }">
        {{ statusText }}
      </div>
    </div>
    
    <button @click="startScan" class="scan-button" :disabled="isScanning">
      {{ isScanning ? 'Escaneando...' : 'Iniciar Scan' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isScanning = ref(false);
const scanComplete = ref(false);
const scanProgress = ref(0);

const statusText = computed(() => {
  if (!isScanning.value && !scanComplete.value) return 'Pronto para escanear';
  if (isScanning.value) return `Escaneando... ${Math.round(scanProgress.value)}%`;
  if (scanComplete.value) return 'Scan completo!';
  return '';
});

const startScan = () => {
  if (isScanning.value) return;
  
  // Reset estado
  scanComplete.value = false;
  scanProgress.value = 0;
  isScanning.value = true;
  
  // Atualiza o progresso
  const interval = setInterval(() => {
    scanProgress.value += 2;
    if (scanProgress.value >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        isScanning.value = false;
        scanComplete.value = true;
      }, 500);
    }
  }, 50);
};
</script>

<style scoped>
.scanner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
}

.scanner-frame {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 2rem;
}

/* Cantos arredondados */
.corner {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 8px solid #0078FF;
  border-radius: 12px;
}

.top-left {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.top-right {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

/* Elementos faciais */
.face-elements {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 120px;
}

.eye {
  position: absolute;
  width: 8px;
  height: 16px;
  background-color: #0078FF;
  border-radius: 4px;
  top: 30px;
}

.left-eye {
  left: 25px;
}

.right-eye {
  right: 25px;
}

.nose {
  position: absolute;
  width: 8px;
  height: 30px;
  background-color: #0078FF;
  border-radius: 4px;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.mouth {
  position: absolute;
  width: 60px;
  height: 8px;
  background-color: #0078FF;
  border-radius: 4px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0 0 20px 20px;
}

/* Linha de scan */
.scan-line {
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: rgba(0, 120, 255, 0.6);
  top: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgba(0, 120, 255, 0.8);
  opacity: 0;
}

.scan-line.scanning {
  animation: scan 2s ease-in-out infinite;
  opacity: 1;
}

@keyframes scan {
  0% {
    top: 0;
  }
  50% {
    top: calc(100% - 4px);
  }
  100% {
    top: 0;
  }
}

/* Status text */
.status-text {
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #0078FF;
  font-weight: bold;
  transition: color 0.3s ease;
}

.status-text.success {
  color: #00C853;
}

/* Botão de scan */
.scan-button {
  margin-top: 3rem;
  padding: 12px 24px;
  background-color: #0078FF;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.scan-button:hover {
  background-color: #0066DD;
}

.scan-button:active {
  transform: scale(0.98);
}

.scan-button:disabled {
  background-color: #99CCFF;
  cursor: not-allowed;
}
</style>