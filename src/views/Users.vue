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
                          @click="passingASortingParameter('id')">id Пользователя
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'first_name' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('first_name')">Имя
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'second_name' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('second_name')">Фамилия
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'tg_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('tg_id')">Telegram id
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'role_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('role_id')">Роль
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in sortedData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.first_name }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.second_name }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.tg_id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ $store.getters.getRoles[data.role_id] ? $store.getters.getRoles[data.role_id] : 'Обычный пользователь' }}
        </CTableDataCell>
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
    <CForm class="row gx-3 needs-validation">
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
            <CFormInput id="second_name" aria-describedby="inputGroupPrepend" required
                        v-model="state.second_name" placeholder="Иван"
                        :feedbackInvalid="feedbackInvalidInput('second_name')"
                        @input="validateInput('second_name')"
                        :valid="validOrInvalidInput('second_name', true)"
                        :invalid="validOrInvalidInput('second_name', false)"/>
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
              <option :value="null">Обычный пользователь</option>
              <option v-for="([id, title], index) in Object.entries($store.getters.getRoles)"
                      :value="id" :key="index">{{ title }}
              </option>
            </CFormSelect>
          </CInputGroup>
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Закрыть</CButton>
        <CButton color="primary" type="button" @click="checkValidateModal(state)">{{ modalButton }}</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import {rules, state} from "@/mixins/vuelidateUser";
import sorted from "@/mixins/sorted";
import main from "@/mixins/main";
import {mapGetters} from "vuex";
import useVuelidate from "@vuelidate/core/dist/index.esm";

export default {
  name: "Users",
  mixins: [sorted, main],
  setup() {

    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  computed: {
    ...mapGetters(['getRoles'])
  },
  methods: {
    setValidData(state) {
      let data = {};
      if (!this.flagModal) { data.id = Number(state.id) }
      data.first_name = state.first_name === null ? "" : String(state.first_name)
      data.second_name = state.second_name === null ? "" : String(state.second_name)
      data.tg_id = state.tg_id === null ? "" : Number(state.tg_id)
      data.role_id = state.role_id === null ? "" : Number(state.role_id)
      return data
    },
    setEditData(data) {
      this.state.first_name = data.first_name
      this.state.second_name = data.second_name
      this.state.tg_id = String(data.tg_id)
      this.state.role_id = String(data.role_id)
      this.state.id = data.id
    }
  }
}
</script>

<style scoped>

</style>
