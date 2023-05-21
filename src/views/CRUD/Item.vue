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
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Кодовое слово</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.slug }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormTextarea id="slug" value="" aria-describedby="inputGroupPrepend" required
                      v-model="state.slug" placeholder="slug" rows="2"
                      :feedbackInvalid="feedbackInvalidInput('slug')"
                      @input="validateInput('slug')"
                      :valid="validOrInvalidInput('slug', true)"
                      :invalid="validOrInvalidInput('slug', false)"
                         @click="textAreaAdjust($event.target)" @keyup="textAreaAdjust($event.target)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Цена (RUB)</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.price }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="price" value="" aria-describedby="inputGroupPrepend" required
                      v-model="state.price" placeholder="price"
                      :feedbackInvalid="feedbackInvalidInput('price')"
                      @input="validateInput('price')"
                      :valid="validOrInvalidInput('price', true)"
                      :invalid="validOrInvalidInput('price', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Цена (USD)</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.price_usd }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="price_usd" value="" aria-describedby="inputGroupPrepend" required
                      v-model="state.price_usd" placeholder="price_usd"
                      :feedbackInvalid="feedbackInvalidInput('price_usd')"
                      @input="validateInput('price_usd')"
                      :valid="validOrInvalidInput('price_usd', true)"
                      :invalid="validOrInvalidInput('price_usd', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Описание</CTableHeaderCell>
        <CTableDataCell :style="!getSection.description ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'"
                        v-if="!flagEdit">{{ getSection.description ? getSection.description : 'Не заданно' }}
        </CTableDataCell>
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
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Период</CTableHeaderCell>
        <CTableDataCell :style="!getSection.duration ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'"
                        v-if="!flagEdit">{{ getSection.duration ? minutesToTimeStruct(getSection.duration) : 'Не заданно' }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormFloating class="w-100 mb-3">
            <CFormInput id="duration" value="" aria-describedby="inputGroupPrepend"
                        v-model="state.duration" placeholder="duration"
                        :feedbackInvalid="feedbackInvalidInput('duration')"
                        @input="validateInput('duration')"
                        :valid="validOrInvalidInput('duration', true)"
                        :invalid="validOrInvalidInput('duration', false)"/>
            <CFormLabel for="duration">{{minutesToTimeStruct(state.duration)}}</CFormLabel>
          </CFormFloating>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Многоразовая покупка</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.can_buy_muliple_times === true ? 'Да' : 'Нет'}}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormSwitch id="can_buy_muliple_times" aria-describedby="inputGroupPrepend"
                       v-model="state.can_buy_muliple_times" label="Выключите, если не нужна многоразовая покупка!"
                       @change="validateInput('can_buy_muliple_times')"
                       :valid="validOrInvalidInput('can_buy_muliple_times', true)"
                       :invalid="validOrInvalidInput('can_buy_muliple_times', false)"/>
        </CInputGroup>
      </CTableRow>

      <CTableRow v-if="flagEdit">
        <CTableHeaderCell  colspan="2" class="text-end" v-bind:style="'width: 250px'">
          <CButton color="secondary" class="btn-white me-3" @click="cancellationEdit">Отменить</CButton>
          <CButton color="primary" class="btn-white" type="button" @click="checkValidateEditInputs(state)">Изменить
          </CButton>
        </CTableHeaderCell>
      </CTableRow>
    </CTableBody>

  </CTable>
</template>

<script>
import section from "@/mixins/section";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateItems";
import {mapGetters} from "vuex";
import {setValidDataItems} from "@/mixins/setValidDataCRUD";
import minutesToTimeStruct from "@/mixins/minutesToTimeStruct";

export default {
  name: "Item",
  mixins: [section, minutesToTimeStruct],
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  computed: {
    ...mapGetters(['getRoles'])
  },
  methods: {
    setValidData(state) {
      return setValidDataItems(state)
    }
  },
}
</script>

<style scoped>

</style>
