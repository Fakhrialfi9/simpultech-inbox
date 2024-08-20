<script lang="ts" setup>
  import { RouterView } from "vue-router";
  import Navbar from "../../ui/components/navbar/inbox.vue";
  import Footer from "../../ui/components/footer/inbox.vue";
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

<style scoped src="../style/conversation.css"></style>
