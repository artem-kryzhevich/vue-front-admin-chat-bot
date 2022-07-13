<template>
  <!-- Callback mode -->
  <span v-if="!isLoaded">Загрузка...</span>
  <telegram-login-temp
      mode="callback"
      telegram-login="rrrandom12_bot"
      @loaded='telegramLoadedCallbackFunc'
      @callback="yourCallbackFunction"
  />

  <!-- Redirect mode -->
  <telegram-login-temp
      mode="redirect"
      telegram-login="rrrandom12_bot"
      @loaded='telegramLoadedCallbackFunc'
      redirect-url="url"
  />
</template>

<script setup>
import { telegramLoginTemp } from 'vue3-telegram-login'
import { ref } from 'vue'

const isLoaded = ref(false)

function telegramLoadedCallbackFunc () {
  console.log('script is loaded')
  isLoaded.value = true
}

function yourCallbackFunction (user) {
  // gets user as an input
  // id, first_name, last_name, username,
  // photo_url, auth_date and hash
  console.log(user)
}
</script>
