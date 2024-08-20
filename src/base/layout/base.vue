<script lang="ts" setup>
  import { RouterView } from "vue-router";
  import Navbar from "../../ui/components/navbar/base.vue";
  import Footer from "../../ui/components/footer/footer.vue";
</script>

<template>
  <div class="layout">
    <header class="navbar">
      <Navbar />
    </header>
    <main class="main">
      <div class="pages">
        <transition name="slide" mode="out-in">
          <RouterView key="$route.fullPath" />
        </transition>
      </div>
    </main>
    <footer class="footer">
      <Footer />
    </footer>
  </div>
</template>

<style scoped src="../style/base.css"></style>
