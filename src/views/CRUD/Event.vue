<template>
  <CContainer fluid>
    <CRow v-for="obj in $router.currentRoute.value.matched">
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center text-black"
            v-if="$router.currentRoute.value.path === obj.path && obj.name !== ''">
        {{ obj.name }}
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex align-items-center" v-if="flagEdit">
        <CIcon icon="cil-warning"/>
        <CCardTitle class="ps-2 mb-0">Редактирование!</CCardTitle>
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="warning" class="btn-white me-3" @click="editInputsSection(getEvent)">
          <CIcon icon="cil-pencil"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CAlert color="dark" v-if="Object.keys(getEvent).length <= 0">В базе данных нет записей!</CAlert>
  <CTable bordered hover responsive class="table-fixed mb-0"
          v-if="typeof getEvent === 'object' && Object.keys(getEvent).length > 0">
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell colspan="4" scope="col" v-bind:style="'width: 1%'">Название</CTableHeaderCell>
        <CTableHeaderCell scope="col">Значение</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <template v-for="(my_items, my_keys, my_index) in getEvent">
        <template v-if="typeof my_items !== 'object'">
          <CTableRow :key="my_keys">
            <CTableHeaderCell colspan="4" scope="row">{{ ObjectTitleKeys[my_keys] }}</CTableHeaderCell>
            <CTableDataCell v-if="!flagEdit && my_keys !== 'date'">{{ my_items }}</CTableDataCell>
            <CTableDataCell v-if="!flagEdit && my_keys === 'date'">{{ $moment(my_items).format('LL') }}</CTableDataCell>
            <CInputGroup class="has-validation" v-if="flagEdit && my_keys !== 'date'">
              <CFormTextarea :id="my_keys" value="" aria-describedby="inputGroupPrepend"
                             v-model="state[my_keys]" placeholder="..."
                             :feedbackInvalid="feedbackInvalidInput(my_keys)"
                             @input="validateInput(my_keys)"
                             :valid="validOrInvalidInput(my_keys, true)"
                             :invalid="validOrInvalidInput(my_keys, false)"
                             @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)" rows="2"/>
            </CInputGroup>
            <Datepicker v-if="flagEdit && my_keys === 'date'"
                        locale="ru" :enableTimePicker="false" :format="'dd.MM.yyyy'" monthNameFormat="long"
                        :clearable="false" selectText="Выбрать" cancelText="Закрыть" v-model="state[my_keys]"
                        @update:modelValue="validateInput(my_keys)">
              <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
                <CInputGroup class="has-validation">
                  <CFormInput :id="my_keys" aria-describedby="inputGroupPrepend" required
                              placeholder="..."
                              :feedbackInvalid="feedbackInvalidInput(my_keys)"
                              @input="validateInput(my_keys)"
                              :valid="validOrInvalidInput(my_keys, true)"
                              :invalid="validOrInvalidInput(my_keys, false)" :value="value"/>
                </CInputGroup>
              </template>
            </Datepicker>
          </CTableRow>
        </template>
        <template v-if="typeof my_items === 'object'">
          <template v-for="(items, keys, index) in my_items">
            <template v-if="typeof items !== 'object'">
              <CTableRow :key="my_keys+'_'+keys">
                <CTableHeaderCell scope="row">{{ ObjectTitleKeys[my_keys] }}</CTableHeaderCell>
                <CTableHeaderCell colspan="3" scope="row">{{ ObjectTitleKeys[keys] }}</CTableHeaderCell>
                <CTableDataCell v-if="!flagEdit">{{ items }}</CTableDataCell>
                <CInputGroup class="has-validation" v-if="flagEdit">
                  <CFormTextarea :id="my_keys+'_'+keys" value="" aria-describedby="inputGroupPrepend"
                                 v-model="state[my_keys][keys]" placeholder="..."
                                 :feedbackInvalid="feedbackInvalidInput(my_keys, keys)"
                                 @input="validateInput(my_keys, keys)"
                                 :valid="validOrInvalidInput(my_keys, true, keys)"
                                 :invalid="validOrInvalidInput(my_keys, false, keys)"
                                 @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)" rows="7"/>
                </CInputGroup>
              </CTableRow>
            </template>
            <template v-if="typeof items === 'object'">
              <template v-for="(item, key, ind) in items">
                <template v-if="typeof item !== 'object'">
                  <CTableRow :key="my_keys+'_'+keys+'_'+key">
                    <template v-if="keys === 0 && ind === 0">
                      <CTableHeaderCell scope="row">{{ ObjectTitleKeys[my_keys] }}</CTableHeaderCell>
                      <CTableHeaderCell scope="row" class="text-end" colspan="2">{{Number(keys) + 1}}</CTableHeaderCell>
                      <CTableHeaderCell scope="row" class="text-end">{{ ObjectTitleKeys[key] }}</CTableHeaderCell>
                    </template>
                    <template v-else-if="ind === 0">
                      <CTableHeaderCell scope="row" class="text-end" colspan="3">{{Number(keys) + 1}}</CTableHeaderCell>
                      <CTableHeaderCell scope="row" class="text-end">{{ ObjectTitleKeys[key] }}</CTableHeaderCell>
                    </template>
                    <template v-else>
                      <CTableHeaderCell scope="row" class="text-end" colspan="4">{{ ObjectTitleKeys[key] }}</CTableHeaderCell>
                    </template>
                    <CTableDataCell v-if="!flagEdit">{{ item }}</CTableDataCell>
                    <CInputGroup class="has-validation" v-if="flagEdit">
                      <CFormTextarea :id="my_keys+'_'+keys+'_'+key" value="" aria-describedby="inputGroupPrepend"
                                     v-model="state[my_keys][keys][key]" placeholder="..."
                                     :feedbackInvalid="feedbackInvalidInput(my_keys, keys, key)"
                                     @input="validateInput(my_keys, keys, key)"
                                     :valid="validOrInvalidInput(my_keys, true, keys, key)"
                                     :invalid="validOrInvalidInput(my_keys, false, keys, key)"
                                     @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)" rows="2"/>
                    </CInputGroup>
                  </CTableRow>
                </template>
                <template v-if="typeof item === 'object'">
                  <template v-for="(i, k, inx) in item">
                    <template v-if="typeof i !== 'object'">
                      <CTableRow :key="my_keys+'_'+keys+'_'+key+'_'+k">
                        <CTableHeaderCell scope="row" class="text-end"></CTableHeaderCell>
                        <template v-if="key === 0 && inx === 0">
                          <CTableHeaderCell scope="row" class="text-end">{{ ObjectTitleKeys[keys] }}</CTableHeaderCell>
                          <CTableHeaderCell scope="row" class="text-end">{{ Number(key) + 1 }}</CTableHeaderCell>
                          <CTableHeaderCell scope="row" class="text-end">{{ ObjectTitleKeys[k] }}</CTableHeaderCell>
                        </template>
                        <template v-else-if="inx === 0">
                          <CTableHeaderCell scope="row" class="text-end" colspan="2">{{Number(key) + 1}}</CTableHeaderCell>
                          <CTableHeaderCell scope="row">{{ ObjectTitleKeys[k] }}</CTableHeaderCell>
                        </template>
                        <template v-else>
                          <CTableHeaderCell scope="row" class="text-end" colspan="3">{{ ObjectTitleKeys[k] }}</CTableHeaderCell>
                        </template>
                        <CTableDataCell v-if="!flagEdit">{{ i }}</CTableDataCell>
                        <CInputGroup class="has-validation" v-if="flagEdit">
                          <CFormTextarea :id="my_keys+'_'+keys+'_'+key+'_'+k" value="" aria-describedby="inputGroupPrepend"
                                         v-model="state[my_keys][keys][key][k]" placeholder="..."
                                         :feedbackInvalid="feedbackInvalidInput(my_keys, keys, key, k)"
                                         @input="validateInput(my_keys, keys, key, k)"
                                         :valid="validOrInvalidInput(my_keys, true, keys, key, k)"
                                         :invalid="validOrInvalidInput(my_keys, false, keys, key, k)"
                                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)" rows="2"/>
                        </CInputGroup>
                      </CTableRow>
                    </template>
                  </template>
                </template>
              </template>
            </template>
          </template>
        </template>
      </template>

      <CTableRow v-if="flagEdit">
        <CTableHeaderCell colspan="5" class="text-one-line text-end" v-bind:style="'width: 250px'">
          <CButton color="secondary" class="btn-white me-3" @click="cancellationEdit">Отменить</CButton>
          <CButton color="primary" type="button" class="btn-white" @click="checkValidateEditInputs(state)">Изменить
          </CButton>
        </CTableHeaderCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateEvent";
import {mapActions, mapGetters} from "vuex";
import Datepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'
import EventBus from "@/common/EventBus";

export default {
  name: "Event",
  components: {Datepicker},
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  data() {
    return {
      flagEdit: false,
      ObjectTitleKeys: {
        title:'Название',
        date: 'Дата',
        description: 'Описание',
        video_file_id: 'File ID видео',
        buttons: 'Кнопки',
        cities_meet: 'Встречи по городам',
        text: 'Текст',
        url: 'Ссылка'
      },
    }
  },
  computed: {
    ...mapGetters(['getEvent']),
  },
  methods: {
    ...mapActions(['getAllEvent', 'editingEvent']),
    editInputsSection(data) {
      this.flagEdit = true
      this.setEditDataEvent(data)
      this.v$.$validate()
    },
    cancellationEdit() {
      this.flagEdit = false
      this.v$.$reset()
      this.clearDataEvent()
    },
    setEditDataEvent(data) {
      Object.keys(data).forEach(y => {
        if (typeof data[y] === 'object') {
          Object.keys(data[y]).forEach(v => {
            if (typeof data[y][v] === 'object') {
              if (/^\d+$/.test(v)) {
                this.state[y][v] = {text: null, url: null}
                Object.keys(data[y][v]).forEach(t => {
                  this.state[y][v][t] = String(data[y][v][t])
                })
              } else {
                Object.keys(data[y][v]).forEach(t => {
                  this.state[y][v][t] = {text: null, url: null}
                  Object.keys(data[y][v][t]).forEach(u => {
                    this.state[y][v][t][u] = String(data[y][v][t][u])
                  })
                })
              }
            } else {
              this.state[y][v] = String(data[y][v])
            }
          })
        } else {
          this.state[y] = String(data[y])
        }
      })
    },
    clearDataEvent() {
      this.state.title = null
      this.state.date = null
      this.state.description = null
      this.state.video_file_id = null
      this.state.buttons = [{text: null, url: null}]
      this.state.cities_meet = {text: null, buttons: [{text: null, url: null}]}
    },
    validateInput(name, param1 = -1, param2 = -1, param3 = -1) {
      if (param1 === -1 && param2 === -1 && param3 === -1) {
        this.v$[name].$touch()
      } else if (param1 !== -1 && param2 === -1 && param3 === -1) {
        this.v$[name][param1].$touch()
      } else if (param1 !== -1 && param2 !== -1 && param3 === -1) {
        this.v$[name].$touch()
      } else {
        this.v$[name][param1].$touch()
      }
    },
    validOrInvalidInput(name, select, param1 = -1, param2 = -1, param3 = -1, invalid = false, dirty = false) {
      if (param1 === -1 && param2 === -1 && param3 === -1) {
        invalid = this.v$[name].$invalid
        dirty = this.v$[name].$dirty
      } else if (param1 !== -1 && param2 === -1 && param3 === -1) {
        invalid = this.v$[name][param1].$invalid
        dirty = this.v$[name][param1].$dirty
      } else if (param1 !== -1 && param2 !== -1 && param3 === -1) {
        invalid = this.v$[name].$each.$response.$data[param1][param2].$invalid
        dirty = this.v$[name].$dirty
     } else {
        invalid = this.v$[name][param1].$each.$response.$data[param2][param3].$invalid
        dirty = this.v$[name][param1].$dirty
     }

     if (select)
        return !!(!invalid && dirty)
      else
        return !!(invalid && dirty)
    },
    feedbackInvalidInput(name, param1 = -1, param2 = -1, param3 = -1) {
      if (param1 === -1 && param2 === -1 && param3 === -1) {
        return this.v$[name].$error ? this.v$[name].$errors[0].$message : null
      } else if (param1 !== -1 && param2 === -1 && param3 === -1) {
        return this.v$[name][param1].$error ? this.v$[name][param1].$errors[0].$message : null
      } else if (param1 !== -1 && param2 !== -1 && param3 === -1) {
        return this.v$[name].$each.$response.$data[param1][param2].$error ?
            this.v$[name].$each.$response.$errors[param1][param2][0].$message : null
      } else {
        return this.v$[name][param1].$each.$response.$data[param2][param3].$error ?
            this.v$[name][param1].$each.$response.$errors[param2][param3][0].$message : null
      }
    },
    checkValidateEditInputs(state) {
      this.v$.$validate()
      if (!this.v$.$error) {
        let data = this.setValidDataEvent(state)
        this.editingEvent(data).then(
            (response) => {
              if (response.data.status_code && response.data.status_code === 404) {
                this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка изменения!'})
              } else {
                this.$store.dispatch('getAllBotInfo')
                this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное изменение!'})
                this.cancellationEdit()
              }
            }).catch((error) => {
          this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка изменения!'})
          if (error.response && error.response.status === 403) {
            EventBus.dispatch("logout");
          }
        })
      }
    },
    setValidDataEvent(state) {
      let data = { buttons: [], cities_meet: { buttons: [] } }
      data.title = String(state.title)
      data.date = String(this.$moment(this.$moment(state.date).format('YYYY-MM-DD'))
          .set({hour: 0, minute: 0, second: 0, millisecond: 0}).format('YYYY-MM-DDTHH:mm:ss'))
      data.description = String(state.description)
      data.video_file_id = String(state.video_file_id)
      Object.keys(state.buttons).forEach(k => {
        data.buttons[k] = {text: null, url: null}
        Object.keys(state.buttons[k]).forEach(t => {
          data.buttons[k][t] = String(state.buttons[k][t])
        })
      })
      data.cities_meet.text = String(state.cities_meet.text)
      Object.keys(state.cities_meet.buttons).forEach(k => {
        data.cities_meet.buttons[k] = {text: null, url: null}
        Object.keys(state.cities_meet.buttons[k]).forEach(t => {
          data.cities_meet.buttons[k][t] = String(state.cities_meet.buttons[k][t])
        })
      })
      return data
    },
    textAreaAdjust(element) {
      element.style.height = "1px";
      element.style.height = (25 + element.scrollHeight) + "px";
    }
  },
  async mounted() {
    await this.getAllEvent()
  }
}
</script>

<style scoped>

</style>
