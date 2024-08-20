<script lang="ts" setup>
  import { computed } from "vue";
  import { RouterLink, useRoute } from "vue-router";
  import { ArrowLeft, X } from "lucide-vue-next";
  import { conversations } from "../../../data/inboxData.js";

  const route = useRoute();
  const conversationId = route.params.id as string;

  const conversation = computed(() => {
    return conversations.find((c) => c.id === conversationId) || null;
  });

  const participantsCount = computed(() => {
    return conversation.value ? conversation.value.participants.length : 0;
  });
</script>

<template>
  <nav class="navbar">
    <div class="Container">
      <div class="content">
        <div class="left">
          <RouterLink to="/">
            <ArrowLeft />
          </RouterLink>
          <div class="headline">
            <h5>{{ conversation ? conversation.titleMessage : "Loading..." }}</h5>
            <p>{{ participantsCount }} Participants</p>
          </div>
        </div>
        <div class="right">
          <RouterLink to="/">
            <X />
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped src="../../../assets/style/components/navbar/inbox.css"></style>
