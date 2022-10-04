<template>
  <CModal alignment="center" scrollable :visible="modalImportOpen" @close="closeImportModal(iv$, importState)">
    <CModalHeader>
      <CModalTitle>Импорт пользователей </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <upload-excel-component :on-success="handleSuccess" :importState="importState" :iv$="iv$"/>
    </CModalBody>
    <CModalFooter class="justify-content-between">
      <CTooltip :content="'Для удачного импорта пользователей файл excel должен ' +
       'содержать следующие заголовки: tg_id, first_name, phone_number, date_of_payment, subscribe_end_date, role'"
                placement="bottom">
        <template #toggler="{ on }">
          <CButton class="justify-content-start" color="info" variant="outline" v-on="on">
            <CIcon icon="cil-info"/>
          </CButton>
        </template>
      </CTooltip>
      <div>
      <CButton color="secondary" class="btn-white me-3" @click="closeImportModal(iv$, importState)">Отмена</CButton>
      <CButton color="primary" type="button" class="btn-white" @click="checkValidateImportModal(importState)">Загрузить</CButton>
      </div>
    </CModalFooter>
  </CModal>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel";
import {getCurrentInstance, reactive, toRaw} from "vue";
import {helpers, maxLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import EventBus from "@/common/EventBus";
import TooltipInfoContent from "@/components/TooltipInfoContent";

export default {
  name: "UsersImport_modal",
  props: ['modalImportOpen', 'closeImportModal', 'openImportModal'],
  components: {TooltipInfoContent, UploadExcelComponent},
  setup() {
    const internalInstance = getCurrentInstance()

    let telegram_id = helpers.regex(/^(-?#?-?#?)[1-9]\d*$/)
    const customMessages = reactive({
      required: 'Поле обязательно для заполнения',
      telegram_id: 'Поле может содержать только цифры',
      date: 'Поле должно быть в формате даты'
    })

    const myMoment = internalInstance.appContext.config.globalProperties.$moment
    const formats = ['DD.MM.YYYY', 'D.MM.YYYY', 'DD.M.YYYY', 'YYYY.MM.DD', 'YYYY.M.DD', 'YYYY.MM.D',
      'D-MM-YYYY', 'DD-M-YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD', 'YYYY-M-DD', 'YYYY-MM-D',
      'D/MM/YYYY', 'DD/M/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'YYYY/M/DD', 'YYYY/MM/D'];

    const rules = {
      collection: {
        $each: helpers.forEach({
          tg_id: {
            required: helpers.withMessage(customMessages.required, required),
            telegram_id: helpers.withMessage(customMessages.telegram_id, telegram_id)
          },
          first_name: {required: helpers.withMessage(customMessages.required, required)},
          phone_number: {
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(25))
          },
          role: {},
          date_of_payment: {
            required: helpers.withMessage(customMessages.required, required),
            date: helpers.withMessage(customMessages.date,
                value => myMoment(value, formats, true).isValid()),
          },
          subscribe_end_date: {
            required: helpers.withMessage(customMessages.required, required),
            date: helpers.withMessage(customMessages.date,
                value => myMoment(value, formats, true).isValid()),
          }
        })
      }
    }
    const importState = reactive({collection: []})
    const iv$ = useVuelidate(rules, importState)
    return {iv$, importState}
  },
  methods: {
    handleSuccess({results}) {
      this.importState.collection = results
    },
    checkValidateImportModal(importState) {
      this.iv$.$validate()
      if (!this.iv$.$error) {
        let data = toRaw(importState.collection)
        let myMoment = this.$moment
        const formats = ['DD.MM.YYYY', 'D.MM.YYYY', 'DD.M.YYYY', 'YYYY.MM.DD', 'YYYY.M.DD', 'YYYY.MM.D',
          'D-MM-YYYY', 'DD-M-YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD', 'YYYY-M-DD', 'YYYY-MM-D',
          'D/MM/YYYY', 'DD/M/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'YYYY/M/DD', 'YYYY/MM/D'];
        data.forEach(e => {
          e.tg_id = Number(String(e.tg_id).replace(/\D/g, ''));
          e.first_name = e.first_name !== null && e.first_name !== '' ? String(e.first_name) : null;
          e.phone_number = e.phone_number !== null && e.phone_number !== '' ? String(e.phone_number) : null;
          e.date_of_payment = myMoment(e.date_of_payment, formats, true).format('YYYY-MM-DD') + 'T00:00:00.000Z';
          e.subscribe_end_date = myMoment(e.subscribe_end_date, formats, true).format('YYYY-MM-DD') + 'T00:00:00.000Z';
        })
        this.$store.dispatch('importUsers', {"data": data}).then(
            (response) => {
              if (response.status === 200) {
                this.$store.commit('updateUrl', this.$route.path.replace(/(\/*$)/, ""))
                this.$store.dispatch('getAllData')
                this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное добавление!'})
                this.closeImportModal(this.iv$, this.importState)
              }
            },
            (error) => {
              this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка добавления!'})
              if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
              }
            }
        )
      }
    }
  }
}
</script>

<style scoped>

</style>
