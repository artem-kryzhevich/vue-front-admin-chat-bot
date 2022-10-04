<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center bg_login">
    <CContainer class="d-flex justify-content-center">
      <div class="wrap_login justify-content-center">
        <div class="d-flex justify-content-center w-100 js-tilt mb-3" data-tilt>
          <CImage class="d-flex justify-content-center m-auto w-100" fluid src="/icons/logo_black.png" />
        </div>
        <CForm class="w-100">
          <AppLogin></AppLogin>
          <CFormLabel for="tg_id" class="d-flex justify-content-center" v-bind:style="'font-weight: bold;'">Telegram ID</CFormLabel>
          <CFormInput placeholder="Введите telegram ID" id="tg_id" value="" aria-describedby="inputGroupPrepend"
                      v-model="state.tg_id"
                      :feedbackInvalid="feedbackInvalidInput('tg_id')"
                      @input="validateLoginInput"
                      :valid="validOrInvalidInput('tg_id', true)"
                      :invalid="validOrInvalidInput('tg_id', false)"/>
          <CButton color="primary" type="button" @click="handleLogin(Number(state.tg_id))"
                   class="d-flex w-100 justify-content-center m-auto mt-3 border-radius-10 button-login">Войти</CButton>
        </CForm>
      </div>
    </CContainer>
  </div>
</template>

<script>
import AppLogin from "@/components/AppLogin";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateLogin";
import {
  clearData,
  feedbackInvalidInput,
  validateInput,
  validOrInvalidInput
} from "@/mixins/methodsCRUD";

export default {
name: "Login",
  components: {AppLogin},
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    validateLoginInput() {
      state.isUnique = true
      this.validateInput('tg_id')
    },
    handleLogin(user) {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.loading = true;
        this.$store.dispatch("auth/login", user).then(
            (resp) => {
              if (resp.status_code === 404) {
                state.isUnique = false
                this.v$.$validate()
              }
              else {
                this.v$.$reset()
                this.clearData()
                document.querySelector('script[src="https://code.jquery.com/jquery-3.6.0.min.js"]').remove()
                document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/tilt.js/1.2.1/tilt.jquery.min.js"]').remove()
                this.$router.push("/");
              }
            },
            (error) => {
              this.loading = false;
              this.message =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();
            }
        );
      }
    },
    validOrInvalidInput,
    feedbackInvalidInput,
    validateInput,
    clearData
  },
  mounted() {
    state.isUnique = true

    const loadScript = (url, callback) => {
      const script = document.createElement('script');
      script.addEventListener('load', () => { callback(); });
      script.src = url;
      document.body.append(script);
    };
    loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/tilt.js/1.2.1/tilt.jquery.min.js', () => {
        $('.js-tilt').tilt({
          scale: 1.1
        })
      });
    });
  }

}
</script>

<style scoped>

</style>
