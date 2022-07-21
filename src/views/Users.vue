<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center">Пользователи
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="success" @click="openAddModal" class="me-3">
          <CIcon icon="cil-plus"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CTable bordered hover>
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col" @click="passingASortingParameter('id')">id Пользователя</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="passingASortingParameter('first_name')">Имя в Telegram</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="passingASortingParameter('second_name')">Фамилия в Telegram</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="passingASortingParameter('tg_id')">Telegram id</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="passingASortingParameter('role_id')">Role id</CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(user, index) in sortedUsers" :key="index">
        <CTableDataCell>{{ user.id }}</CTableDataCell>
        <CTableDataCell>{{ user.first_name }}</CTableDataCell>
        <CTableDataCell>{{ user.second_name }}</CTableDataCell>
        <CTableDataCell>{{ user.tg_id }}</CTableDataCell>
        <CTableDataCell>{{ user.role_id ? user.role_id : 'null' }}</CTableDataCell>
        <CTableDataCell style="justify-content: center; display: flex;">
          <CButton color="warning" class="me-3" @click="openEditModal(user)">
            <CIcon icon="cil-pencil"/>
          </CButton>
          <CButton color="danger" @click="methodDeleteUser(user)">
            <CIcon icon="cil-trash"/>
          </CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <paginate
      :page-count="totalPagesCount"
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

  <CModal alignment="center" scrollable :visible="modalUser" @close="closeModal">
    <CForm class="row g-3 needs-validation">
      <CModalHeader>
        <CModalTitle>{{ modalTitle }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCol xs="12">
          <CFormLabel for="first_name">Имя</CFormLabel>
          <CInputGroup class="has-validation">
            <CFormInput id="first_name" value="" aria-describedby="inputGroupPrepend" required
                        v-model="state.first_name" placeholder="Иван"
                        :feedbackInvalid="feedbackInvalidInput(Object.keys(state)[0])"
                        @input="validateInput(Object.keys(state)[0])"
                        :valid="validOrInvalidInput(Object.keys(state)[0], true)"
                        :invalid="validOrInvalidInput(Object.keys(state)[0], false)"/>
          </CInputGroup>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="second_name">Фамилия</CFormLabel>
          <CInputGroup class="has-validation">
            <CFormInput id="second_name" aria-describedby="inputGroupPrepend" required
                        v-model="state.second_name" placeholder="Иван"
                        :feedbackInvalid="feedbackInvalidInput(Object.keys(state)[1])"
                        @input="validateInput(Object.keys(state)[1])"
                        :valid="validOrInvalidInput(Object.keys(state)[1], true)"
                        :invalid="validOrInvalidInput(Object.keys(state)[1], false)"/>
          </CInputGroup>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="tg_id">TG id</CFormLabel>
          <CInputGroup class="has-validation">
            <CFormInput id="telegram_id" aria-describedby="inputGroupPrepend" required
                        v-model="state.tg_id" placeholder="123456789"
                        :feedbackInvalid="feedbackInvalidInput(Object.keys(state)[2])"
                        @input="validateInput(Object.keys(state)[2])"
                        :valid="validOrInvalidInput(Object.keys(state)[2], true)"
                        :invalid="validOrInvalidInput(Object.keys(state)[2], false)"/>
          </CInputGroup>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="role_id">Роль</CFormLabel>
          <CInputGroup class="has-validation">
            <CFormSelect id="role_id" aria-describedby="inputGroupPrepend" required
                         v-model="state.role_id"
                         :feedbackInvalid="feedbackInvalidInput(Object.keys(state)[3])"
                         @input="validateInput(Object.keys(state)[3])"
                         :valid="validOrInvalidInput(Object.keys(state)[3], true)"
                         :invalid="validOrInvalidInput(Object.keys(state)[3], false)">
              <option selected="" value="">Выберите роль...</option>
              <option :value="null">null</option>
              <option value="1">Первая</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option :value="state.role_id">{{ state.role_id }}</option>
            </CFormSelect>
          </CInputGroup>
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Закрыть</CButton>
        <CButton color="primary" type="button" @click="checkValidateModal(state)">{{modalButton}}</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import vuelidateUser, {state, v$} from "@/mixins/vuelidateUser";
import sortered from "@/mixins/sortered";

export default {
  name: "Users",
  mixins: [vuelidateUser, sortered],
  setup() {
    return {state, v$}
  },
  data() {
    return {
      flagModal: null,
      modalUser: false,
      flagSorted: true,
      propertySorted: null
    }
  },
  computed: {
    ...mapGetters(['totalPagesCount']),
    modalTitle() {
      return this.flagModal ? 'Добавление пользователя' : 'Редактирование пользователя'
    },
    modalButton() {
      return this.flagModal ? 'Добавить' : 'Изменить'
    }
  },
  methods: {
    ...mapActions(['getAllUsers', 'deleteUser', 'addUser', 'editingUser']),
    async clickCallback(page) {
      await this.getAllUsers(page);
    },
    methodDeleteUser(user) {
      Swal.fire({
        title: 'Вы уверены?',
        text: "Вы не сможете отменить это!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да, удалить пользователя ' + user.first_name,
        cancelButtonText: 'Отменить',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(user)
        }
      })
    },

    checkValidateModal(user) {
      this.v$.$validate()
      if (!this.v$.$error) {
        if (!this.flagModal) {
          user.id = Number(user.id)
        }
        user.first_name = String(user.first_name)
        user.second_name = String(user.second_name)
        user.tg_id = Number(user.tg_id)
        user.role_id = Number(user.role_id)
        if (this.flagModal) {
          this.addUser(user)
        } else {
          this.editingUser(user)
        }
        this.modalUser = false;
        this.flagModal = null;
        this.v$.$reset()
        this.clearUser()
      }
    },
    clearUser() {
      Object.keys(state).forEach(v => state[v] = '')
      if (!this.flagModal)
        delete state['id'];
    },
    closeModal() {
      this.modalUser = false;
      this.v$.$reset()
      this.clearUser()
    },
    openAddModal() {
      this.modalUser = true;
      this.flagModal = true;
    },
    openEditModal(user) {
      this.state.first_name = user.first_name
      this.state.second_name = user.second_name
      this.state.tg_id = String(user.tg_id)
      this.state.role_id = String(user.role_id)
      this.state.id = user.id

      this.modalUser = true;
      this.flagModal = false;

      console.log(user)
    },
    passingASortingParameter(param) {
      this.propertySorted = param;
      this.flagSorted = !flagSorted
    }
  },
  async mounted() {
    await this.getAllUsers();
  }
}
</script>

<style scoped>

</style>
