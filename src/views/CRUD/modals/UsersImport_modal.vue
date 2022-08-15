<template>
  <CModal alignment="center" scrollable :visible="modalImportOpen" @close="closeImportModal(iv$, importState)">
    <CModalHeader>
      <CModalTitle>Импорт пользователей</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <upload-excel-component :on-success="handleSuccess" :importState="importState" :iv$="iv$"/>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeImportModal(iv$, importState)">Отмена</CButton>
      <CButton color="primary" type="button" @click="checkValidateImportModal(importState)">Загрузить</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel";
import {reactive, toRaw} from "vue";
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import EventBus from "@/common/EventBus";

export default {
  name: "UsersImport_modal",
  props: [ 'modalImportOpen', 'closeImportModal', 'openImportModal' ],
  components: { UploadExcelComponent },
  setup() {
    let telegram_id = helpers.regex(/^[1-9]\d*$/)
    const customMessages = reactive({
      required: 'Поле обязательно для заполнения',
      telegram_id: 'Поле может содержать только цифры',
    })
    const rules = {
      collection: {
        $each: helpers.forEach({
          tg_id: {
            required: helpers.withMessage(customMessages.required, required),
            telegram_id: helpers.withMessage(customMessages.telegram_id, telegram_id)
          },
          first_name: { required: helpers.withMessage(customMessages.required, required) },
          phone: { },
          role: { },
          date_of_payment: { required: helpers.withMessage(customMessages.required, required), },
          subscribe_end_date: { required: helpers.withMessage(customMessages.required, required), }
        })
      }
    }
    const importState = reactive({ collection: [] })
    const iv$ = useVuelidate(rules, importState)
    return { iv$, importState }
  },
  methods: {
    handleSuccess({ results }) {
      this.importState.collection = results
    },
    checkValidateImportModal(importState) {
      this.iv$.$validate()
      if (!this.iv$.$error) {
        let data = toRaw(importState.collection)
        this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное добавление! ' + JSON.stringify(data)})
        /*this.$store.dispatch('importUsers', data).then(
            (response) => {
                this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное добавление!'})
                this.closeImportModal(this.iv$, this.importState)
            },
            (error) => {
              this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка добавления!'})
              if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
              }
            }
        )*/
      }
    }
  }
}
</script>

<style scoped>

</style>
