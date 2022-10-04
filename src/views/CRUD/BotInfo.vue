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
        <CCardTitle class="ps-2 mb-0"> Редактирование!</CCardTitle>
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="warning" class="btn-white me-3" @click="editInputsSection(getBotInfo)">
          <CIcon icon="cil-pencil"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CAlert color="dark" v-if="Object.keys(getBotInfo).length <= 0">В базе данных нет записей!</CAlert>
  <CTable bordered hover responsive class="table-fixed mb-0"
          v-if="typeof getBotInfo === 'object' && Object.keys(getBotInfo).length > 0">
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col" v-bind:style="'width: 1%'">Название</CTableHeaderCell>
        <CTableHeaderCell scope="col" v-bind:style="'width: 1%'"></CTableHeaderCell>
        <CTableHeaderCell scope="col" v-bind:style="'width: 1%'"></CTableHeaderCell>
        <CTableHeaderCell scope="col">Значение</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow>
        <CTableHeaderCell scope="row">Приветствие</CTableHeaderCell>
        <CTableHeaderCell scope="row">Текст</CTableHeaderCell>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getBotInfo.start.text }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="start_text" value="" aria-describedby="inputGroupPrepend"
                         v-model="state.start.text" placeholder="..." rows="5"
                         :feedbackInvalid="feedbackInvalidInput('start', 'text')"
                         @input="validateInput('start', 'text')"
                         :valid="validOrInvalidInput('start', true, 'text')"
                         :invalid="validOrInvalidInput('start', false, 'text')"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableHeaderCell scope="row">File ID обучающего видео</CTableHeaderCell>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getBotInfo.start.tutorial_video }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="start_tutorial_video" value="" aria-describedby="inputGroupPrepend"
                         v-model="state.start.tutorial_video" placeholder="..." rows="2"
                         :feedbackInvalid="feedbackInvalidInput('start', 'tutorial_video')"
                         @input="validateInput('start', 'tutorial_video')"
                         :valid="validOrInvalidInput('start', true, 'tutorial_video')"
                         :invalid="validOrInvalidInput('start', false, 'tutorial_video')"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row">Миссия</CTableHeaderCell>
        <CTableHeaderCell scope="row">Текст</CTableHeaderCell>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getBotInfo.missions.text }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="missions_text" value="" aria-describedby="inputGroupPrepend"
                         v-model="state.missions.text" placeholder="..." rows="5"
                         :feedbackInvalid="feedbackInvalidInput('missions', 'text')"
                         @input="validateInput('missions', 'text')"
                         :valid="validOrInvalidInput('missions', true, 'text')"
                         :invalid="validOrInvalidInput('missions', false, 'text')"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <template v-for="(button, index) in getBotInfo.missions.buttons">
        <CTableRow>
          <CTableHeaderCell scope="row"></CTableHeaderCell>
          <CTableHeaderCell scope="row" v-if="index === 0">Кнопки</CTableHeaderCell>
          <CTableHeaderCell scope="row" v-else></CTableHeaderCell>
          <CTableHeaderCell scope="row">Текст</CTableHeaderCell>
          <CTableDataCell v-if="!flagEdit">{{ button.text }}</CTableDataCell>
          <CInputGroup class="has-validation" v-if="flagEdit">
            <CFormTextarea :id="'missions_buttons_'+index+'_text'" value="" aria-describedby="inputGroupPrepend"
                           v-model="state.missions.buttons[index].text"
                           placeholder="..." rows="1"
                           :feedbackInvalid="feedbackInvalidInput('missions', 'buttons', 'text', index)"
                           @input="validateInput('missions', 'buttons', 'text', index)"
                           :valid="validOrInvalidInput('missions', true, 'buttons', 'text', index)"
                           :invalid="validOrInvalidInput('missions', false, 'buttons', 'text', index)"
                           @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
          </CInputGroup>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row"></CTableHeaderCell>
          <CTableHeaderCell scope="row"></CTableHeaderCell>
          <CTableHeaderCell scope="row">Ссылка</CTableHeaderCell>
          <CTableDataCell v-if="!flagEdit">{{ button.url }}</CTableDataCell>
          <CInputGroup class="has-validation" v-if="flagEdit">
            <CFormTextarea :id="'missions_buttons_'+index+'_url'" value="" aria-describedby="inputGroupPrepend"
                           v-model="state.missions.buttons[index].url"
                           placeholder="..." rows="1"
                           :feedbackInvalid="feedbackInvalidInput('missions', 'buttons', 'url', index)"
                           @input="validateInput('missions', 'buttons', 'url', index)"
                           :valid="validOrInvalidInput('missions', true, 'buttons', 'url', index)"
                           :invalid="validOrInvalidInput('missions', false, 'buttons', 'url', index)"
                           @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
          </CInputGroup>
        </CTableRow>
      </template>
      <CTableRow>
        <CTableHeaderCell scope="row">Статусы</CTableHeaderCell>
        <CTableHeaderCell scope="row">Текст</CTableHeaderCell>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getBotInfo.statuses.text }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="statuses_text" value="" aria-describedby="inputGroupPrepend"
                         v-model="state.statuses.text" placeholder="..." rows="5"
                         :feedbackInvalid="feedbackInvalidInput('statuses', 'text')"
                         @input="validateInput('statuses', 'text')"
                         :valid="validOrInvalidInput('statuses', true, 'text')"
                         :invalid="validOrInvalidInput('statuses', false, 'text')"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row">Тематические каналы</CTableHeaderCell>
        <CTableHeaderCell scope="row">Текст</CTableHeaderCell>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getBotInfo.thematic_channels.text }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="thematic_channels_text" value="" aria-describedby="inputGroupPrepend"
                         v-model="state.thematic_channels.text" placeholder="..." rows="5"
                         :feedbackInvalid="feedbackInvalidInput('thematic_channels', 'text')"
                         @input="validateInput('thematic_channels', 'text')"
                         :valid="validOrInvalidInput('thematic_channels', true, 'text')"
                         :invalid="validOrInvalidInput('thematic_channels', false, 'text')"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableHeaderCell scope="row">Текст цели</CTableHeaderCell>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getBotInfo.thematic_channels.goals_text }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="thematic_channels_goals_text" value="" aria-describedby="inputGroupPrepend"
                         v-model="state.thematic_channels.goals_text" placeholder="..."
                         rows="5"
                         :feedbackInvalid="feedbackInvalidInput('thematic_channels', 'goals_text')"
                         @input="validateInput('thematic_channels', 'goals_text')"
                         :valid="validOrInvalidInput('thematic_channels', true, 'goals_text')"
                         :invalid="validOrInvalidInput('thematic_channels', false, 'goals_text')"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row">Ошибка доступа</CTableHeaderCell>
        <CTableHeaderCell scope="row">Текст</CTableHeaderCell>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getBotInfo.invalid_access.text }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="invalid_access_text" value="" aria-describedby="inputGroupPrepend"
                         v-model="state.invalid_access.text" placeholder="..." rows="1"
                         :feedbackInvalid="feedbackInvalidInput('invalid_access', 'text')"
                         @input="validateInput('invalid_access', 'text')"
                         :valid="validOrInvalidInput('invalid_access', true, 'text')"
                         :invalid="validOrInvalidInput('invalid_access', false, 'text')"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow v-if="flagEdit">
        <CTableHeaderCell colspan="4" class="text-one-line text-end" v-bind:style="'width: 250px'">
          <CButton color="secondary" class="btn-white me-3" @click="cancellationEdit">Отменить</CButton>
          <CButton color="primary" type="button" class="btn-white" @click="checkValidateEditInputs(state)">Изменить
          </CButton>
        </CTableHeaderCell>
      </CTableRow>
    </CTableBody>
  </CTable>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateBotInfo";
import EventBus from "@/common/EventBus";

export default {
  name: "BotInfo",
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  data() {
    return {
      flagEdit: false
    }
  },
  computed: {
    ...mapGetters(['getBotInfo']),
  },
  methods: {
    ...mapActions(['getAllBotInfo', 'editingBotInfo']),
    editInputsSection(data) {
      this.flagEdit = true
      this.setEditDataBotInfo(data)
      this.v$.$validate()
    },
    cancellationEdit() {
      this.flagEdit = false
      this.v$.$reset()
      this.clearDataBotInfo()
    },
    validateInput(name) {
      this.v$[name].$touch()
    },
    validOrInvalidInput(name, select, param, btn, index = -1, invalid = false) {
      if (index===-1)
        invalid = this.v$[name][param].$invalid
      else
        invalid = this.v$[name][param].$each.$response.$data[index][btn].$invalid

      if (select)
        return !!(!invalid && this.v$[name][param].$dirty)
      else
        return !!(invalid && this.v$[name][param].$dirty)
    },
    feedbackInvalidInput(name, param, btn, index = -1) {
      if (index===-1) {
        return this.v$[name][param].$error ? this.v$[name][param].$errors[0].$message : null
      } else {
        return this.v$[name][param].$each.$response.$data[index][btn].$error ?
            this.v$[name][param].$each.$response.$errors[index][btn][0].$message : null
      }
    },
    setEditDataBotInfo(data) {
      Object.keys(data).forEach(v => {
        Object.keys(data[v]).forEach(k => {
          if (k === 'buttons') {
            this.state[v][k] = []
            Object.keys(data[v][k]).forEach(r => {
              this.state[v][k][r] = { text: null, url: null }
              Object.keys(data[v][k][r]).forEach(t => {
                this.state[v][k][r][t] = data[v][k][r][t]
              })
            })
          } else {
            this.state[v][k] = data[v][k]
          }
        })
      })
    },
    clearDataBotInfo() {
      this.state.start = {text: null, tutorial_video: null}
      this.state.missions = {text: null, buttons: [{text: null, url: null}]}
      this.state.statuses = {text: null}
      this.state.thematic_channels = {text: null, goals_text: null}
      this.state.invalid_access = {text: null}
    },
    checkValidateEditInputs(state) {
      this.v$.$validate()
      if (!this.v$.$error) {
        let data = this.setValidDataBotInfo(state)
        this.editingBotInfo(data).then(
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
    setValidDataBotInfo(state) {
      let data = {start: {}, missions: {buttons: [] }, statuses: {}, thematic_channels: {}, invalid_access: {}};
      data.start.text = String(state.start.text)
      data.start.tutorial_video = String(state.start.tutorial_video)
      data.missions.text = String(state.missions.text)
      Object.keys(state.missions.buttons).forEach(k => {
        data.missions.buttons[k] = {text: null, url: null}
        Object.keys(state.missions.buttons[k]).forEach(t => {
          data.missions.buttons[k][t] = String(state.missions.buttons[k][t])
        })
      })
      data.statuses.text = String(state.statuses.text)
      data.thematic_channels.text = String(state.thematic_channels.text)
      data.thematic_channels.goals_text = String(state.thematic_channels.goals_text)
      data.invalid_access.text = String(state.invalid_access.text)
      return data
    },
    textAreaAdjust(element) {
      element.style.height = "1px";
      element.style.height = (25+element.scrollHeight)+"px";
    },
  },
  async mounted() {
    await this.getAllBotInfo()
  }
}
</script>

<style scoped>

</style>
