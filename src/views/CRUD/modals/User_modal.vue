<template>
  <CModal alignment="center" scrollable :visible="modalOpen" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ modalTitle }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="12">
        <CFormLabel for="first_name">Имя</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="first_name" value="" aria-describedby="inputGroupPrepend" required
                      v-model="state.first_name" placeholder="Иван"
                      :feedbackInvalid="feedbackInvalidInput('first_name')"
                      @input="validateInput('first_name')"
                      :valid="validOrInvalidInput('first_name', true)"
                      :invalid="validOrInvalidInput('first_name', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="second_name">Фамилия</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="second_name" aria-describedby="inputGroupPrepend"
                      v-model="state.second_name" placeholder="Иван"
                      :feedbackInvalid="feedbackInvalidInput('second_name')"
                      @input="validateInput('second_name')"
                      :valid="validOrInvalidInput('second_name', true)"
                      :invalid="validOrInvalidInput('second_name', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="phone_number">Номер телефона</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="phone_number" aria-describedby="inputGroupPrepend"
                      v-model="state.phone_number" placeholder="7123456789"
                      :feedbackInvalid="feedbackInvalidInput('phone_number')"
                      @input="validateInput('phone_number')"
                      :valid="validOrInvalidInput('phone_number', true)"
                      :invalid="validOrInvalidInput('phone_number', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="tg_id">TG id</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="telegram_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.tg_id" placeholder="123456789"
                      :feedbackInvalid="feedbackInvalidInput('tg_id')"
                      @input="validateInput('tg_id')"
                      :valid="validOrInvalidInput('tg_id', true)"
                      :invalid="validOrInvalidInput('tg_id', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="role_id">Роль</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormSelect id="role_id" aria-describedby="inputGroupPrepend" required
                       v-model="state.role_id"
                       :feedbackInvalid="feedbackInvalidInput('role_id')"
                       @input="validateInput('role_id')"
                       :valid="validOrInvalidInput('role_id', true)"
                       :invalid="validOrInvalidInput('role_id', false)">
            <option selected="" value="">Выберите роль...</option>
            <option :value="flagModal?'null':-1">Пользователь</option>
            <option v-for="([id, title], index) in Object.entries(getRoles)"
                    :value="id" :key="index">{{ title }}
            </option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" class="btn-white" @click="closeModal">Закрыть</CButton>
      <CButton color="primary" type="button" class="btn-white" @click="checkValidateModal(state)">{{ modalButton }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
export default {
  name: "User_modal",
  props: ['state', 'getRoles', 'modalOpen', 'modalTitle', 'modalButton', 'flagModal',
          'checkValidateModal', 'closeModal', 'validOrInvalidInput', 'feedbackInvalidInput', 'validateInput', 'textAreaAdjust']
}
</script>

<style scoped>

</style>
