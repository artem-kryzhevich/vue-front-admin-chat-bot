<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center text-black">
        {{ getSection.title !== null && getSection.title !== '' && getSection.title !== undefined ?
          $router.currentRoute.value.name + " - " + getSection.title :
          $router.currentRoute.value.name + " - " + $router.currentRoute.value.params.id
        }}
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex align-items-center" v-if="flagEdit">
        <CIcon icon="cil-warning"/><CCardTitle class="ps-2 mb-0"> Редактирование!</CCardTitle>
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="warning" class="btn-white me-3" @click="editInputsSection(getSection)">
          <CIcon icon="cil-pencil"/>
        </CButton>
        <CButton color="danger" class="btn-white" @click="methodDelete(getSection.id)">
          <CIcon icon="cil-trash"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CTable bordered hover responsive class="table-fixed mb-0">
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col">Название</CTableHeaderCell>
        <CTableHeaderCell scope="col">Значение</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">ID</CTableHeaderCell>
        <CTableDataCell>{{ getSection.id }}</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Название</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.title }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="title" value="" aria-describedby="inputGroupPrepend"
                      v-model="state.title" placeholder="title" rows="2"
                      :feedbackInvalid="feedbackInvalidInput('title')"
                      @input="validateInput('title')"
                      :valid="validOrInvalidInput('title', true)"
                      :invalid="validOrInvalidInput('title', false)"
                      @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Кодовое слово</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.slug }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="slug" aria-describedby="inputGroupPrepend" required
                      v-model="state.slug" placeholder="slug"
                      :feedbackInvalid="feedbackInvalidInput('slug')"
                      @input="validateInput('slug')"
                      :valid="validOrInvalidInput('slug', true)"
                      :invalid="validOrInvalidInput('slug', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">ID Канала</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.channel_tg_id }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="channel_tg_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.channel_tg_id" placeholder="channel_tg_id"
                      :feedbackInvalid="feedbackInvalidInput('channel_tg_id')"
                      @input="validateInput('channel_tg_id')"
                      :valid="validOrInvalidInput('channel_tg_id', true)"
                      :invalid="validOrInvalidInput('channel_tg_id', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Ссылка на Канал</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.channel_url }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="channel_url" aria-describedby="inputGroupPrepend" required
                         v-model="state.channel_url" placeholder="channel_url" rows="2"
                         :feedbackInvalid="feedbackInvalidInput('channel_url')"
                         @input="validateInput('channel_url')"
                         :valid="validOrInvalidInput('channel_url', true)"
                         :invalid="validOrInvalidInput('channel_url', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Эмодзи</CTableHeaderCell>
        <CTableDataCell :style="!getSection.emoji ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'"
                        v-if="!flagEdit">{{ getSection.emoji ? getSection.emoji : 'Не заданно' }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="emoji" aria-describedby="inputGroupPrepend" required
                      v-model="state.emoji" placeholder="emoji"
                      :feedbackInvalid="feedbackInvalidInput('emoji')"
                      @input="validateInput('emoji')"
                      :valid="validOrInvalidInput('emoji', true)"
                      :invalid="validOrInvalidInput('emoji', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">ID приватного Канала</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.private_channel_tg_id }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="private_channel_tg_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.private_channel_tg_id" placeholder="private_channel_tg_id"
                      :feedbackInvalid="feedbackInvalidInput('private_channel_tg_id')"
                      @input="validateInput('private_channel_tg_id')"
                      :valid="validOrInvalidInput('private_channel_tg_id', true)"
                      :invalid="validOrInvalidInput('private_channel_tg_id', false)"/>
        </CInputGroup>
      </CTableRow>

      <CTableRow v-if="flagEdit">
        <CTableHeaderCell  colspan="2" class="text-end" v-bind:style="'width: 250px'">
          <CButton color="secondary" class="btn-white me-3" @click="cancellationEdit">Отменить</CButton>
          <CButton color="primary" type="button" class="btn-white" @click="checkValidateEditInputs(state)">Изменить
          </CButton>
        </CTableHeaderCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>
import section from "@/mixins/section";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateCategories";
import {setValidDataCategories} from "@/mixins/setValidDataCRUD";

export default {
  name: "Category",
  mixins: [section],
  setup() {

    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  methods: {
    setValidData(state) {
      return setValidDataCategories(state)
    }
  },
}
</script>

<style scoped>

</style>
