<template>
  <div>
    <h1>Dashboard Cliente</h1>
    <p>Ultimos premios resgatados!</p>

    <!-- Carousel -->
    <div class="carousel">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div class="carousel-item" v-for="(banner, index) in banners" :key="index">
          <img :src="banner.image" :alt="banner.alt" />
        </div>
      </div>
      <button class="carousel-btn prev" @click="prevSlide">‹</button>
      <button class="carousel-btn next" @click="nextSlide">›</button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashcliente'
});
import { ref, onMounted, onUnmounted } from 'vue';

const banners = ref([
  { image: 'https://cdn.pixabay.com/photo/2015/10/29/14/38/web-1012467_1280.jpg', alt: 'Banner 1' },
  { image: 'https://img.lovepik.com/background/20211022/large/lovepik-taobao-tmall-e-commerce-banner-background-image_500603827.jpg', alt: 'Banner 2' },
  { image: 'https://png.pngtree.com/thumb_back/fh260/back_pic/02/50/63/71577e1cf59d802.jpg', alt: 'Banner 3' },
]);

const currentSlide = ref(0);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % banners.value.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + banners.value.length) % banners.value.length;
};

// Automatic slide change every 10 seconds
let intervalId;

onMounted(() => {
  intervalId = setInterval(nextSlide, 10000); // 10 seconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  /* max-width: 600px; */
  margin: auto;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-item img {
  width: 100%;
  display: block;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}
</style>