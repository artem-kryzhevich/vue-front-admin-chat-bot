<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex align-items-center" v-if="flagEdit">
        <CIcon icon="cil-warning"/><CCardTitle class="ps-2 mb-0"> Редактирование!</CCardTitle>
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="warning" class="me-3" @click="editInputsSection(getSection)">
          <CIcon icon="cil-pencil"/>
        </CButton>
        <CButton color="danger" @click="methodDelete(getSection.id)">
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
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">item_id</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit">{{ getSection.item_id }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="item_id" value="" aria-describedby="inputGroupPrepend"
                      v-model="state.item_id" placeholder="item_id"
                      :feedbackInvalid="feedbackInvalidInput('item_id')"
                      @input="validateInput('item_id')"
                      :valid="validOrInvalidInput('item_id', true)"
                      :invalid="validOrInvalidInput('item_id', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">user_id</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit">{{ getSection.user_id }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="user_id" value="" aria-describedby="inputGroupPrepend"
                      v-model="state.user_id" placeholder="user_id"
                      :feedbackInvalid="feedbackInvalidInput('user_id')"
                      @input="validateInput('user_id')"
                      :valid="validOrInvalidInput('user_id', true)"
                      :invalid="validOrInvalidInput('user_id', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">expiration_date</CTableHeaderCell>
        <CTableDataCell class="text-one-line" v-if="!flagEdit">{{ $moment(getSection.expiration_date).format('LL') }}
        </CTableDataCell>
          <Datepicker v-if="flagEdit" locale="ru" :enableTimePicker="false" :format="'dd.MM.yyyy'" monthNameFormat="long"
                      :clearable="false" selectText="Выбрать" cancelText="Закрыть" v-model="state.expiration_date"
                      @update:modelValue="validateInput('expiration_date')">
            <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
              <CInputGroup class="has-validation">
                <CFormInput id="expiration_date" aria-describedby="inputGroupPrepend" required
                            placeholder="expiration_date"
                            :feedbackInvalid="feedbackInvalidInput('expiration_date')"
                            @input="validateInput('expiration_date')"
                            :valid="validOrInvalidInput('expiration_date', true)"
                            :invalid="validOrInvalidInput('expiration_date', false)" :value="value"/>
              </CInputGroup>
            </template>
          </Datepicker>
      </CTableRow>

      <CTableRow v-if="flagEdit">
        <CTableHeaderCell  colspan="2" class="text-one-line text-end" v-bind:style="'width: 250px'">
          <CButton color="secondary" class="me-3" @click="cancellationEdit">Отменить</CButton>
          <CButton color="primary" type="button" @click="checkValidateEditInputs(state)">Изменить
          </CButton>
        </CTableHeaderCell>
      </CTableRow>
    </CTableBody>

  </CTable>
</template>

<script>
import section from "@/mixins/section";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidatePaymentsHistory";
import {setValidDataPaymentsHistory} from "@/mixins/setValidDataCRUD";
import Datepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: "PaymentHistory",
  components: {Datepicker},
  mixins: [section],
  setup() {

    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  methods: {
    setValidData(state) {
      return setValidDataPaymentsHistory(state, false, this.$moment)
    }
  },
}
</script>

<style scoped>

</style>
