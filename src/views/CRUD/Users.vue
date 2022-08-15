<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center text-black">
        {{ $router.currentRoute.value.name }}
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="info" @click="openImportModal" class="me-3">
          <CIcon icon="cil-CloudUpload"/>
        </CButton>
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
                          @click="passingASortingParameter('id')">id Пользователя
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'first_name' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('first_name')">Имя
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'second_name' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('second_name')">Фамилия
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'tg_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('tg_id')">Telegram id
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'role_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('role_id')">Роль
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in getData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.first_name }}</CTableDataCell>
        <CTableDataCell class="text-one-line" :style="!data.second_name ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          {{ data.second_name ? data.second_name : 'Не заданно' }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.tg_id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">
          <a :href="getRoles[data.role_id] ? '/roles/'+data.role_id : null">
            {{ getRoles[data.role_id] ? getRoles[data.role_id] : 'Пользователь' }}
          </a>
        </CTableDataCell>
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

  <user_modal :state="state" :getRoles="getRoles"
         :modalOpen="modalOpen" :modalTitle="modalTitle"
         :modalButton="modalButton" :flagModal="flagModal"
         :feedbackInvalidInput="feedbackInvalidInput"
         :closeModal="closeModal" :validateInput="validateInput" :validOrInvalidInput="validOrInvalidInput"
         :checkValidateModal="checkValidateModal"></user_modal>

  <users-import_modal :modalImportOpen="modalImportOpen" :closeImportModal="closeImportModal" :openImportModal="openImportModal"></users-import_modal>
</template>

<script>
import {rules, state} from "@/mixins/vuelidateUser";
import main from "@/mixins/main";
import {mapGetters} from "vuex";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import { setValidDataUser } from "@/mixins/setValidDataCRUD";
import User_modal from "@/views/CRUD/modals/User_modal";
import UsersImport_modal from '@/views/CRUD/modals/UsersImport_modal'

export default {
  name: "Users",
  components: {User_modal, UsersImport_modal},
  mixins: [main],
  setup() {
    const v$ = useVuelidate(rules, state)

    return {state, v$}
  },
  data() {
    return {
      modalImportOpen: false
    }
  },
  computed: {
    ...mapGetters(['getRoles'])
  },
  methods: {
    setValidData(state) {
      return setValidDataUser(state, this.flagModal)
    },

    openImportModal() {
      return this.modalImportOpen = !this.modalImportOpen
    },
    closeImportModal(iv$, importState) {
      this.openImportModal()
      iv$.$reset()
      importState.collection = []
    }
  }
}
</script>

<style scoped>

</style>
