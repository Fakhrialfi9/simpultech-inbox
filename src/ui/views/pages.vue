<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { RouterLink } from "vue-router";
  import { conversations } from "../../data/inboxData.js";
  import { formatDate, formatTime } from "@/utils/formatters";
  import { User } from "lucide-vue-next";
  import Dock from "../components/navbar/dock.vue";

  const isLoading = ref(true);

  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  });

  const conversationsData = ref(conversations);

  const getBackgroundColor = (participantId) => {
    const storedColor = localStorage.getItem(`avatar-color-${participantId}`);
    if (storedColor) {
      return storedColor;
    }
  };

  const assignAvatarColors = (participants) => {
    return participants.map((participant) => {
      return {
        ...participant,
        backgroundColor: getBackgroundColor(participant.id),
      };
    });
  };

  const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return null;
    return messages.reduce((latest, message) => (new Date(message.timestamp) > new Date(latest.timestamp) ? message : latest));
  };

  const formatLastMessageDate = (timestamp) => formatDate(timestamp);
  const formatLastMessageTime = (timestamp) => formatTime(timestamp);
</script>

<template>
  <main class="main">
    <div class="Container">
      <div class="content">
        <div v-if="isLoading" class="spinnerContainer">
          <div class="spinner"></div>
          <h5>Loading Chat Content...</h5>
        </div>
        <ul v-else>
          <li v-for="conversation in conversationsData" :key="conversation.id">
            <RouterLink :to="{ name: 'conversation', params: { id: conversation.id } }">
              <div class="containeravatar">
                <div class="avatar" v-for="participant in assignAvatarColors(conversation.participants)" :key="participant.id">
                  <h6><User size="18" /></h6>
                </div>
              </div>
              <div class="information">
                <div class="header">
                  <div class="headline">
                    <h5>{{ conversation.titleMessage }}</h5>
                  </div>
                  <div class="datetime">
                    <p>
                      {{
                        getLastMessage(conversation.messages)?.timestamp
                          ? formatLastMessageDate(getLastMessage(conversation.messages)?.timestamp)
                          : ""
                      }}
                    </p>
                    <p>
                      {{
                        getLastMessage(conversation.messages)?.timestamp
                          ? formatLastMessageTime(getLastMessage(conversation.messages)?.timestamp)
                          : ""
                      }}
                    </p>
                  </div>
                </div>
                <div class="username">
                  <h5>{{ conversation.participants.find((p) => p.id === getLastMessage(conversation.messages)?.senderId)?.name }}:</h5>
                </div>
                <div class="contentmessage">
                  <h5>{{ getLastMessage(conversation.messages)?.content }}</h5>
                </div>
              </div>
              <div class="badge">
                <span v-if="conversation.unreadCount > 0">{{ conversation.unreadCount }}</span>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <Dock />
  </main>
</template>

<style scoped src="../../assets/style/views/pages.css"></style>
