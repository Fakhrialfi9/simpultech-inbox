<script lang="ts" setup>
  import { ref, computed, onMounted, onBeforeUnmount } from "vue";
  import { useRoute } from "vue-router";
  import { conversations } from "../../data/inboxData.js";
  import { Ellipsis, Trash2, Pencil, Share, Reply } from "lucide-vue-next";

  const route = useRoute();
  const conversationId = route.params.id;

  const conversation = computed(() => {
    return conversations.find((c) => c.id === conversationId);
  });

  if (!conversation.value) {
    throw new Error(`Conversation with id ${conversationId} not found`);
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const scrollToElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isNewDay = (currentTimestamp: string, previousTimestamp: string) => {
    const currentDate = new Date(currentTimestamp);
    const previousDate = new Date(previousTimestamp);
    return currentDate.toDateString() !== previousDate.toDateString();
  };

  const activeSelectId = ref<string | null>(null);

  const toggleDropdown = (messageId: string) => {
    closeAllDropdowns();
    if (activeSelectId.value === messageId) {
      activeSelectId.value = null;
    } else {
      activeSelectId.value = messageId;
    }
  };

  const closeAllDropdowns = () => {
    activeSelectId.value = false;
  };

  const handleClickOutside = (event: MouseEvent) => {
    const dropdowns = document.querySelectorAll(".select");
    const isClickOutside = Array.from(dropdowns).every((dropdown) => !dropdown.contains(event.target as Node));

    if (isClickOutside) {
      closeAllDropdowns();
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  const isLoading = ref(true);

  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  });
</script>

<template>
  <main class="main">
    <div class="Container">
      <div class="content">
        <div class="chat" v-if="conversation">
          <div
            v-for="(message, index) in conversation.messages"
            :key="message.id"
            :class="{
              containerbubblesend: message.senderId === 'user1',
              containerbubblereceive: message.senderId !== 'user1',
            }">
            <div v-if="index === 0 || isNewDay(message.timestamp, conversation.messages[index - 1].timestamp)" class="newmessage">
              <div class="diver"></div>
              <h5>
                {{
                  isToday(new Date(message.timestamp))
                    ? "Today, " + new Date(message.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    : new Date(message.timestamp).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                }}
              </h5>
              <div class="diver"></div>
            </div>

            <div
              v-if="conversation.unreadCount > 0 && message.senderId !== 'user1' && index === conversation.messages.length - conversation.unreadCount"
              class="newmessage">
              <div class="diver"></div>
              <h5 id="target-element">New Message</h5>
              <div class="diver"></div>
            </div>

            <code v-if="isLoading" class="loadingconversation">
              <div class="spinner"></div>
              <h5>Please wait while we connect you with one of our team ...</h5>
            </code>

            <div
              v-if="conversation.unreadCount > 0 && message.senderId !== 'user1' && index === conversation.messages.length - conversation.unreadCount"
              class="badgenewmessage">
              <code @click="scrollToElement('#target-element')">New Message</code>
            </div>

            <div class="username">
              <h5 v-if="message.senderId === 'user1'">You</h5>
              <h5 v-else>
                {{ conversation.participants.find((p) => p.id === message.senderId)?.name }}
              </h5>
            </div>
            <div class="wrapbubble">
              <span @click.stop="toggleDropdown(message.id)">
                <Ellipsis :size="20" />

                <div v-if="activeSelectId === message.id" class="select" ref="dropdown">
                  <ul>
                    <li>
                      <a href=""> <Pencil :size="15" /> Edit Message</a>
                    </li>
                    <li>
                      <a href=""> <Share :size="15" /> Share Message</a>
                    </li>
                    <li>
                      <a href=""> <Reply :size="15" /> Reply Message</a>
                    </li>
                    <li>
                      <a href=""> <Trash2 :size="15" /> Delete Message</a>
                    </li>
                  </ul>
                </div>
              </span>

              <div class="bubble">
                <h5 v-if="isLoading">...</h5>
                <h5 v-else>{{ message.content }}</h5>
                <div class="time">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="../../assets/style/views/conversation.css"></style>
