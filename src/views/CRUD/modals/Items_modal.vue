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
        <CFormLabel for="price">Цена (RUB)</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: Integer'"></tooltip-info-content>
          <CFormInput id="price" aria-describedby="inputGroupPrepend" required
                      v-model="state.price" placeholder="price"
                      :feedbackInvalid="feedbackInvalidInput('price')"
                      @input="validateInput('price')"
                      :valid="validOrInvalidInput('price', true)"
                      :invalid="validOrInvalidInput('price', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="price_usd">Цена (USD)</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: Integer'"></tooltip-info-content>
          <CFormInput id="price_usd" aria-describedby="inputGroupPrepend" required
                      v-model="state.price_usd" placeholder="price_usd"
                      :feedbackInvalid="feedbackInvalidInput('price_usd')"
                      @input="validateInput('price_usd')"
                      :valid="validOrInvalidInput('price_usd', true)"
                      :invalid="validOrInvalidInput('price_usd', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="description">Описание</CFormLabel>
        <CInputGroup class="has-validation">
          <tooltip-info-content :content="'Тип: String. Максимальная длина 1024 символов'"></tooltip-info-content>
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
        <CInputGroup class="form-floating has-validation mb-0">
          <CFormLabel for="duration" class="form-label-duration">{{minutesToTimeStruct(state.duration)}}</CFormLabel>
          <tooltip-info-content :content="'Тип: Integer'"></tooltip-info-content>
          <CFormInput id="duration" aria-describedby="inputGroupPrepend"
                      class="form-input-duration"
                      v-model="state.duration" placeholder="duration"
                      :feedbackInvalid="feedbackInvalidInput('duration')"
                      @input="validateInput('duration')"
                      :valid="validOrInvalidInput('duration', true)"
                      :invalid="validOrInvalidInput('duration', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="can_buy_muliple_times">Многоразовая покупка</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormSwitch id="can_buy_muliple_times" aria-describedby="inputGroupPrepend"
                       v-model="state.can_buy_muliple_times" label="Выключите, если не нужна многоразовая покупка!"
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
import TooltipInfoContent from "@/components/TooltipInfoContent";

export default {
  name: "Items_modal",
  components: {TooltipInfoContent},
  props: ['state', 'modalOpen', 'modalTitle', 'modalButton', 'flagModal', 'minutesToTimeStruct',
    'checkValidateModal', 'closeModal', 'validOrInvalidInput', 'feedbackInvalidInput', 'validateInput', 'textAreaAdjust'],
}
</script>

<style scoped>

</style>
