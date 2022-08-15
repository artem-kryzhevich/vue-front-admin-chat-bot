<template>
  <CModal alignment="center" scrollable :visible="modalOpen" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ modalTitle }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="12">
        <CFormLabel for="title">Название</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="title" value="" aria-describedby="inputGroupPrepend" required
                      v-model="state.title" placeholder="title"
                      :feedbackInvalid="feedbackInvalidInput('title')"
                      @input="validateInput('title')"
                      :valid="validOrInvalidInput('title', true)"
                      :invalid="validOrInvalidInput('title', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="slug">Slug</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="slug" aria-describedby="inputGroupPrepend" required
                      v-model="state.slug" placeholder="slug"
                      :feedbackInvalid="feedbackInvalidInput('slug')"
                      @input="validateInput('slug')"
                      :valid="validOrInvalidInput('slug', true)"
                      :invalid="validOrInvalidInput('slug', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="emoji">Эмодзи</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="emoji" aria-describedby="inputGroupPrepend"
                      v-model="state.emoji" placeholder="emoji"
                      :feedbackInvalid="feedbackInvalidInput('emoji')"
                      @input="validateInput('emoji')"
                      :valid="validOrInvalidInput('emoji', true)"
                      :invalid="validOrInvalidInput('emoji', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="description">Описание</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormTextarea id="description" aria-describedby="inputGroupPrepend"
                         v-model="state.description" placeholder="description" rows="5"
                         :feedbackInvalid="feedbackInvalidInput('description')"
                         @input="validateInput('description')"
                         :valid="validOrInvalidInput('description', true)"
                         :invalid="validOrInvalidInput('description', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="form">Форма</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormTextarea id="form" aria-describedby="inputGroupPrepend"
                         v-model="state.form" placeholder="form" rows="2"
                         :feedbackInvalid="feedbackInvalidInput('form')"
                         @input="validateInput('form')"
                         :valid="validOrInvalidInput('form', true)"
                         :invalid="validOrInvalidInput('form', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="is_visible">Видимость</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormSwitch id="is_visible" aria-describedby="inputGroupPrepend"
                       v-model="state.is_visible" label="Выключите свитч, если роль не должна быть видимой!"
                       @change="validateInput('is_visible')"
                       :valid="validOrInvalidInput('is_visible', true)"
                       :invalid="validOrInvalidInput('is_visible', false)"/>
        </CInputGroup>
      </CCol>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModal">Закрыть</CButton>
      <CButton color="primary" type="button" @click="checkValidateModal(state)">{{ modalButton }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
export default {
  name: "Roles_modal",
  props: ['state', 'modalOpen', 'modalTitle', 'modalButton', 'flagModal',
    'checkValidateModal', 'closeModal', 'validOrInvalidInput', 'feedbackInvalidInput', 'validateInput'],
}
</script>

<style scoped>

</style>
