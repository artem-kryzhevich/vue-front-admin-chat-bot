<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex align-items-center" v-if="!flagEdit">
        <CCardTitle class="ps-2 mb-0">Роль</CCardTitle>
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex align-items-center" v-if="flagEdit">
        <CIcon icon="cil-warning"/><CCardTitle class="ps-2 mb-0">Редактирование Роли!</CCardTitle>
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
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">id</CTableHeaderCell>
        <CTableDataCell class="text-one-line">{{ getSection.id }}</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Название</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit">{{ getSection.title }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="title" value="" aria-describedby="inputGroupPrepend" required
                      v-model="state.title" placeholder="title" rows="2"
                      :feedbackInvalid="feedbackInvalidInput('title')"
                      @input="validateInput('title')"
                      :valid="validOrInvalidInput('title', true)"
                      :invalid="validOrInvalidInput('title', false)"
                      @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Slug</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit">{{ getSection.slug }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="slug" aria-describedby="inputGroupPrepend" required
                      v-model="state.slug" placeholder="slug" rows="2"
                      :feedbackInvalid="feedbackInvalidInput('slug')"
                      @input="validateInput('slug')"
                      :valid="validOrInvalidInput('slug', true)"
                      :invalid="validOrInvalidInput('slug', false)"
                      @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Эмодзи</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit"
                        :style="!getSection.emoji ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          {{ getSection.emoji ? getSection.emoji : 'Не заданно' }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="emoji" aria-describedby="inputGroupPrepend"
                      v-model="state.emoji" placeholder="emoji"
                      :feedbackInvalid="feedbackInvalidInput('emoji')"
                      @input="validateInput('emoji')"
                      :valid="validOrInvalidInput('emoji', true)"
                      :invalid="validOrInvalidInput('emoji', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Описание</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit"
                        :style="!getSection.description ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          {{ getSection.description ? getSection.description : 'Не заданно' }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="description" aria-describedby="inputGroupPrepend"
                         v-model="state.description" placeholder="description" rows="5"
                         :feedbackInvalid="feedbackInvalidInput('description')"
                         @input="validateInput('description')"
                         :valid="validOrInvalidInput('description', true)"
                         :invalid="validOrInvalidInput('description', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Форма</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit"
                        :style="!getSection.form ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          <a :href="getSection.form ? getSection.form : null">
            {{ getSection.form ? getSection.form : 'Не заданно' }}
          </a>
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="form" aria-describedby="inputGroupPrepend"
                         v-model="state.form" placeholder="form" rows="2"
                         :feedbackInvalid="feedbackInvalidInput('form')"
                         @input="validateInput('form')"
                         :valid="validOrInvalidInput('form', true)"
                         :invalid="validOrInvalidInput('form', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Видимость</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit">{{ getSection.is_visible ? 'Да' : 'Нет' }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormSwitch id="is_visible" aria-describedby="inputGroupPrepend"
                       v-model="state.is_visible" label="Выключите свитч, если роль не должна быть видимой!"
                       @change="validateInput('is_visible')"
                       :valid="validOrInvalidInput('is_visible', true)"
                       :invalid="validOrInvalidInput('is_visible', false)"/>
        </CInputGroup>
      </CTableRow>

      <CTableRow v-if="flagEdit">
        <CTableHeaderCell  colspan="2" class="text-one-line text-end" v-bind:style="'width: 250px'">
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
import {rules, state} from "@/mixins/vuelidateRole";
import {setValidDataRole} from "@/mixins/setValidDataCRUD";

export default {
  name: "Role",
  mixins: [section],
  setup() {

    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  methods: {
    setValidData(state) {
      return setValidDataRole(state)
    }
  },
}
</script>

<style scoped>

</style>
