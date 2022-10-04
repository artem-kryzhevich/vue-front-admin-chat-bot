<template>
  <CModal alignment="center" scrollable :visible="modalOpen" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ modalTitle }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="12">
        <CFormLabel for="item_id">item_id</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="item_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.item_id" placeholder="item_id"
                      :feedbackInvalid="feedbackInvalidInput('item_id')"
                      @input="validateInput('item_id', true)"
                      :valid="validOrInvalidInput('item_id', true)"
                      :invalid="validOrInvalidInput('item_id', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="user_id">user_id</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="user_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.user_id" placeholder="user_id"
                      :feedbackInvalid="feedbackInvalidInput('user_id')"
                      @input="validateInput('user_id', true)"
                      :valid="validOrInvalidInput('user_id', true)"
                      :invalid="validOrInvalidInput('user_id', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="expiration_date">expiration_date</CFormLabel>
        <Datepicker locale="ru" :enableTimePicker="false" :format="'dd.MM.yyyy'" monthNameFormat="long"
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
      </CCol>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" class="btn-white" @click="closeModal">Закрыть</CButton>
      <CButton color="primary" type="button" class="btn-white" @click="checkValidateModal(state)">{{ modalButton }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: "PaymentsHistory_modal",
  props: ['state', 'modalOpen', 'modalTitle', 'modalButton', 'flagModal',
    'checkValidateModal', 'closeModal', 'validOrInvalidInput', 'feedbackInvalidInput', 'validateInput', 'textAreaAdjust'],
  components: {Datepicker},
}
</script>

<style scoped>

</style>
