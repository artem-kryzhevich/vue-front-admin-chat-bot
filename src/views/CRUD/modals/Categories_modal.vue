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
          <tooltip-info-content :content="'Тип: String. Максимальная длина 15 символов'"></tooltip-info-content>
          <CFormInput id="slug" aria-describedby="inputGroupPrepend" required
                      v-model="state.slug" placeholder="slug"
                      :feedbackInvalid="feedbackInvalidInput('slug')"
                      @input="validateInput('slug')"
                      :valid="validOrInvalidInput('slug', true)"
                      :invalid="validOrInvalidInput('slug', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="channel_tg_id">ID Канала</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 20 символов'"></tooltip-info-content>
          <CFormInput id="channel_tg_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.channel_tg_id" placeholder="channel_tg_id"
                      :feedbackInvalid="feedbackInvalidInput('channel_tg_id')"
                      @input="validateInput('channel_tg_id')"
                      :valid="validOrInvalidInput('channel_tg_id', true)"
                      :invalid="validOrInvalidInput('channel_tg_id', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="channel_url">Ссылка на Канал</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 100 символов'"></tooltip-info-content>
          <CFormTextarea id="channel_url" aria-describedby="inputGroupPrepend" required
                         v-model="state.channel_url" placeholder="channel_url" rows="2"
                         :feedbackInvalid="feedbackInvalidInput('channel_url')"
                         @input="validateInput('channel_url')"
                         :valid="validOrInvalidInput('channel_url', true)"
                         :invalid="validOrInvalidInput('channel_url', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="emoji">Эмодзи</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 25 символов'"></tooltip-info-content>
          <CFormInput id="emoji" aria-describedby="inputGroupPrepend" required
                      v-model="state.emoji" placeholder="emoji"
                      :feedbackInvalid="feedbackInvalidInput('emoji')"
                      @input="validateInput('emoji')"
                      :valid="validOrInvalidInput('emoji', true)"
                      :invalid="validOrInvalidInput('emoji', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="private_channel_tg_id">ID приватного Канала</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 20 символов'"></tooltip-info-content>
          <CFormInput id="private_channel_tg_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.private_channel_tg_id" placeholder="private_channel_tg_id"
                      :feedbackInvalid="feedbackInvalidInput('private_channel_tg_id')"
                      @input="validateInput('private_channel_tg_id')"
                      :valid="validOrInvalidInput('private_channel_tg_id', true)"
                      :invalid="validOrInvalidInput('private_channel_tg_id', false)"/>
        </CInputGroup>
      </CCol>

    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" class="btn-white" @click="closeModal">Закрыть</CButton>
      <CButton color="primary" class="btn-white" type="button" @click="checkValidateModal(state)">{{ modalButton }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import TooltipInfoContent from "@/components/TooltipInfoContent";
export default {
  name: "Categories_modal",
  components: {TooltipInfoContent},
  props: ['state', 'modalOpen', 'modalTitle', 'modalButton', 'flagModal',
    'checkValidateModal', 'closeModal', 'validOrInvalidInput', 'feedbackInvalidInput', 'validateInput', 'textAreaAdjust'],
}
</script>

<style scoped>

</style>
