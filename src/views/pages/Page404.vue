<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center bg_login">
    <CContainer class="d-flex justify-content-center">
      <div class="wrap_login justify-content-center">
        <div class="d-flex justify-content-center w-100 js-tilt mb-3" data-tilt>
          <CImage class="d-flex justify-content-center m-auto w-100" fluid src="/icons/logo_black.png" />
        </div>
        <CForm class="w-100">
          <h1 class="text-center">404! Ошибка!</h1>
          <CButton color="primary" type="button" @click="goMain()"
                   class="d-flex w-100 justify-content-center m-auto mt-3 border-radius-10 button-login">На главную</CButton>
        </CForm>
      </div>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Page404",
  methods: {
    goMain() {
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>

</style>
