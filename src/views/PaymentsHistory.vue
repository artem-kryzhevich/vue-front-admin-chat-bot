<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center">
        {{ $router.currentRoute.value.name }}
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="success" @click="openAddModal" class="me-3">
          <CIcon icon="cil-plus"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CTable bordered hover responsive class="table-fixed">
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('id')">id
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'item_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('item_id')">item_id
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'user_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('user_id')">user_id
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'expiration_date' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('expiration_date')">expiration_date
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in sortedData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.item_id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.user_id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ $moment(data.expiration_date).format('LL') }}</CTableDataCell>
        <CTableDataCell class="align-text-center">
          <CDropdown color="secondary" :alignment="'end'">
            <CDropdownToggle color="secondary">
              <CIcon icon="cil-Columns"/>
            </CDropdownToggle>
            <CDropdownMenu class="dropdown_button_crud">
              <CButton color="success" class="me-3" @click="openEditModal(data)">
                <CIcon icon="cil-ViewColumn"/>
              </CButton>
              <CButton color="warning" class="me-3" @click="openEditModal(data)">
                <CIcon icon="cil-pencil"/>
              </CButton>
              <CButton color="danger" @click="methodDelete(data.id)">
                <CIcon icon="cil-trash"/>
              </CButton>
            </CDropdownMenu>
          </CDropdown>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <CRow>
    <CCol sm="auto">
      <CFormSelect id="limit" required v-model="countData">
        <option v-for="(count, index) in getArrayCountRow"
                :value="Number(count)" :key="index">{{ count }}
        </option>
      </CFormSelect>
    </CCol>
    <CCol>
      <paginate
          v-model="current_page"
          :page-count="getTotalPages"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :prev-text="'<'"
          :next-text="'>'"
          :first-last-button="true"
          :first-button-text="'<<'"
          :last-button-text="'>>'">
      </paginate>
    </CCol>
  </CRow>
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
                      @input="validateInput('item_id')"
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
                      @input="validateInput('user_id')"
                      :valid="validOrInvalidInput('user_id', true)"
                      :invalid="validOrInvalidInput('user_id', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="expiration_date">expiration_date</CFormLabel>
        <Datepicker locale="ru" :enableTimePicker="false" :format="'dd.MM.yyyy'" monthNameFormat="long"
                    :clearable="false" selectText="Выбрать" cancelText="Закрыть" v-model="state.expiration_date">
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
      <CButton color="secondary" @click="closeModal">Закрыть</CButton>
      <CButton color="primary" type="button" @click="checkValidateModal(state)">{{ modalButton }}</CButton>
    </CModalFooter>
  </CModal>

</template>

<script>
import {state, rules} from "@/mixins/vuelidatePaymentsHistory";
import sorted from "@/mixins/sorted";
import main from "@/mixins/main";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: "PaymentsHistory",
  components: {Datepicker},
  mixins: [sorted, main],
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  methods: {
    setValidData(state) {
      let data = {};
      if (!this.flagModal) {
        data.id = Number(state.id)
      }
      data.item_id = state.item_id === null ? "" : Number(state.item_id)
      data.user_id = state.user_id === null ? "" : Number(state.user_id)
      data.expiration_date = state.expiration_date === null ? "" : String(this.$moment(this.$moment(state.expiration_date).format('YYYY-MM-DD')).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      }).format('YYYY-MM-DDTHH:mm:ss'))
      return data

    },
    setEditData(data) {
      this.state.item_id = data.item_id
      this.state.user_id = data.user_id
      this.state.expiration_date = this.$moment(data.expiration_date).toDate()
      this.state.id = data.id
    }
  }
}
</script>

<style scoped>

</style>
