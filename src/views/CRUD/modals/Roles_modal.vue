<template>
  <CModal alignment="center" scrollable :visible="modalOpen" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ modalTitle }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="12">
        <CFormLabel for="title">Название</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 100 символов'"></tooltip-info-content>
          <CFormTextarea id="title" value="" aria-describedby="inputGroupPrepend" required
                      v-model="state.title" placeholder="title" rows="2"
                      :feedbackInvalid="feedbackInvalidInput('title')"
                      @input="validateInput('title')"
                      :valid="validOrInvalidInput('title', true)"
                      :invalid="validOrInvalidInput('title', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="slug">Кодовое слово</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 100 символов'"></tooltip-info-content>
          <CFormTextarea id="slug" aria-describedby="inputGroupPrepend" required
                      v-model="state.slug" placeholder="slug" rows="2"
                      :feedbackInvalid="feedbackInvalidInput('slug')"
                      @input="validateInput('slug')"
                      :valid="validOrInvalidInput('slug', true)"
                      :invalid="validOrInvalidInput('slug', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="emoji">Эмодзи</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 30 символов'"></tooltip-info-content>
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
          <tooltip-info-content :content="'Тип: String. Максимальная длина 4096 символов'"></tooltip-info-content>
          <CFormTextarea id="description" aria-describedby="inputGroupPrepend"
                         v-model="state.description" placeholder="description" rows="5"
                         :feedbackInvalid="feedbackInvalidInput('description')"
                         @input="validateInput('description')"
                         :valid="validOrInvalidInput('description', true)"
                         :invalid="validOrInvalidInput('description', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="form">Форма</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 100 символов'"></tooltip-info-content>
          <CFormTextarea id="form" aria-describedby="inputGroupPrepend"
                         v-model="state.form" placeholder="form" rows="2"
                         :feedbackInvalid="feedbackInvalidInput('form')"
                         @input="validateInput('form')"
                         :valid="validOrInvalidInput('form', true)"
                         :invalid="validOrInvalidInput('form', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="is_visible">Показывать?</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormSwitch id="is_visible" aria-describedby="inputGroupPrepend"
                       v-model="state.is_visible" label="Выключите, если роль не должна показываться!"
                       @change="validateInput('is_visible')"
                       :valid="validOrInvalidInput('is_visible', true)"
                       :invalid="validOrInvalidInput('is_visible', false)"/>
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
import TooltipInfoContent from "@/components/TooltipInfoContent";
export default {
  name: "Roles_modal",
  components: {TooltipInfoContent},
  props: ['state', 'modalOpen', 'modalTitle', 'modalButton', 'flagModal',
    'checkValidateModal', 'closeModal', 'validOrInvalidInput', 'feedbackInvalidInput', 'validateInput', 'textAreaAdjust'],
}
</script>

<style scoped>

</style>
