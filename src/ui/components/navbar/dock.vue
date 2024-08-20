<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import { Settings2, ListTodo, Moon, Sun } from "lucide-vue-next";

  const activeSelect = ref(false);

  const toggleSelect = () => {
    closeAllDropdowns();
    activeSelect.value = !activeSelect.value;
  };

  const closeAllDropdowns = () => {
    activeSelect.value = false;
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

  const isDarkMode = ref(localStorage.getItem("theme") === "dark");

  const handleSchemaColor = () => {
    const newMode = !isDarkMode.value;
    isDarkMode.value = newMode;
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.classList.toggle("dark", newMode);
    document.body.classList.toggle("light", !newMode);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      isDarkMode.value = isDark;
      document.body.classList.toggle("dark", isDark);
      document.body.classList.toggle("light", !isDark);
    }
  });
</script>

<template>
  <nav class="dock">
    <div class="content">
      <span @click.stop="toggleSelect">
        <Settings2 :size="23" />
      </span>

      <div v-if="activeSelect" class="select" ref="dropdown">
        <ul>
          <li @click="closeSelect">
            <a href="http://localhost:5174/"> <ListTodo :size="15" /> Go to Task Manager</a>
          </li>
          <li @click="handleSchemaColor">
            <a v-if="isDarkMode"> <Sun :size="15" /> Light Mode </a>
            <a v-else> <Moon :size="15" /> Dark Mode </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped src="../../../assets/style/components/navbar/dock.css"></style>
