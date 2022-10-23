<template>
  <div class="d-flex w-50 justify-content-center m-auto">
  <!-- Callback mode -->
  <span v-if="!isLoaded">Загрузка...</span>
  <telegram-login-temp
      mode="callback"
      telegram-login="rrrandom12_bot"
      @loaded='telegramLoadedCallbackFunc'
      @callback="yourCallbackFunction"
  />
  </div>
</template>

<script setup>
import { telegramLoginTemp } from 'vue3-telegram-login'
import { ref } from 'vue'

const isLoaded = ref(false)

function telegramLoadedCallbackFunc () {
  isLoaded.value = true
}

function yourCallbackFunction (user) {
  //console.log(user)
}
</script>
