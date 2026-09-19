import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const appName = ref('Business Boilerplate')
  const darkMode = ref(false)

  function toggleTheme() {
    darkMode.value = !darkMode.value
  }

  return {
    appName,
    darkMode,
    toggleTheme,
  }
})
