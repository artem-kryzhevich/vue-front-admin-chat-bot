<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center">
        {{ $router.currentRoute.value.name + " " + $router.currentRoute.value.params.id}}
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="success" @click="openAddModal" class="me-3">
          <CIcon icon="cil-plus"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CAlert color="dark" v-if="getData.length <= 0">В базе данных нет записей!</CAlert>
  <CTable bordered hover responsive class="table-fixed mb-0" v-if="getData.length > 0">
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('id')">id
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'item_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('item_id')">item_id
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'user_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('user_id')">user_id
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'expiration_date' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('expiration_date')">expiration_date
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in getData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line"><a :href="'/items/'+data.item_id">{{ data.item_id }}</a></CTableDataCell>
        <CTableDataCell class="text-one-line"><a :href="'/users/'+data.user_id">{{ data.user_id }}</a></CTableDataCell>
        <CTableDataCell class="text-one-line">{{ $moment(data.expiration_date).format('LL') }}</CTableDataCell>
        <CTableDataCell class="text-one-line align-text-center">
          <CButton color="info" class="me-3" @click="pushOnRouteId(data.id)">
            <CIcon icon="cil-Notes"/>
          </CButton>
          <CButton color="warning" class="me-3" @click="openEditModal(data)">
            <CIcon icon="cil-pencil"/>
          </CButton>
          <CButton color="danger" @click="methodDelete(data.id)">
            <CIcon icon="cil-trash"/>
          </CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <CRow v-if="getData.length > 0">
    <CCol sm="auto">
      <div class="form-floating">
        <CFormSelect id="limit" class="select-count-row" required v-model="countData">
          <option v-for="(count, index) in getArrayCountRow"
                  :value="Number(count)" :key="index">{{ count }}
          </option>
        </CFormSelect>
        <label class="form-label" for="limit">выводить по</label>
      </div>
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
  <PaymentsHistory_modal :state="state" :modalOpen="modalOpen" :modalTitle="modalTitle" :modalButton="modalButton"
                         :flagModal="flagModal" :feedbackInvalidInput="feedbackInvalidInput" :closeModal="closeModal"
                         :validateInput="validateInput" :validOrInvalidInput="validOrInvalidInput"
                         :checkValidateModal="checkValidateModal"></PaymentsHistory_modal>
</template>

<script>
import main from "@/mixins/main";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidatePaymentsHistory";
import {setValidDataPaymentsHistory} from "@/mixins/setValidDataCRUD";
import PaymentsHistory_modal from "@/views/CRUD/modals/PaymentsHistory_modal";

export default {
  name: "PaymentHistoryUser",
  components: {PaymentsHistory_modal},
  mixins: [main],
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  methods: {
    setValidData(state) {
      return setValidDataPaymentsHistory(state, this.flagModal, this.$moment)
    }
  }
}
</script>

<style scoped>

</style>
