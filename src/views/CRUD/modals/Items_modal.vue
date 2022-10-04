<template>
  <CModal alignment="center" scrollable :visible="modalOpen" @close="closeModal">
    <CModalHeader>
      <CModalTitle>{{ modalTitle }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="12">
        <CFormLabel for="title">Название</CFormLabel>
        <CInputGroup class="has-validation">
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
        <CFormLabel for="slug">Slug</CFormLabel>
        <CInputGroup class="has-validation">
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
        <CFormLabel for="price">Цена</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="price" aria-describedby="inputGroupPrepend" required
                      v-model="state.price" placeholder="price"
                      :feedbackInvalid="feedbackInvalidInput('price')"
                      @input="validateInput('price')"
                      :valid="validOrInvalidInput('price', true)"
                      :invalid="validOrInvalidInput('price', false)"/>
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
                         :invalid="validOrInvalidInput('description', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="duration">Период</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormFloating class="w-100 mb-3">
          <CFormInput id="duration" aria-describedby="inputGroupPrepend"
                      v-model="state.duration" placeholder="duration"
                      :feedbackInvalid="feedbackInvalidInput('duration')"
                      @input="validateInput('duration')"
                      :valid="validOrInvalidInput('duration', true)"
                      :invalid="validOrInvalidInput('duration', false)"/>
            <CFormLabel for="duration">{{minutesToTimeStruct(state.duration)}}</CFormLabel>
          </CFormFloating>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="can_buy_muliple_times">Покупка несколько раз</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormSwitch id="can_buy_muliple_times" aria-describedby="inputGroupPrepend"
                       v-model="state.can_buy_muliple_times" label="Выключите свитч, если не нужна возможность покупать несколько раз!"
                       @change="validateInput('can_buy_muliple_times')"
                       :valid="validOrInvalidInput('can_buy_muliple_times', true)"
                       :invalid="validOrInvalidInput('can_buy_muliple_times', false)"/>
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
  name: "Items_modal",
  props: ['state', 'modalOpen', 'modalTitle', 'modalButton', 'flagModal', 'minutesToTimeStruct',
    'checkValidateModal', 'closeModal', 'validOrInvalidInput', 'feedbackInvalidInput', 'validateInput', 'textAreaAdjust'],
}
</script>

<style scoped>

</style>
