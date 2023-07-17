<script setup>
import {  RouterView } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue';
</script>

<template>
  <div class="bg-slate-100 h-screen">
    <HeaderNav />
    <RouterView />
  </div>
</template>

<style scoped>
.h-screen{
  height: 100vh;
}
</style>
