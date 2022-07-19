<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center">Пользователи
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="success" @click="() => { modalUser = true; flagModal = true }" class="me-3">
          <CIcon icon="cil-plus"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CTable bordered hover>
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col" @click="propertySorted='id';flagSorted=!flagSorted">id Пользователя</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="propertySorted='first_name';flagSorted=!flagSorted">Имя в Telegram</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="propertySorted='second_name';flagSorted=!flagSorted">Фамилия в Telegram
        </CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="propertySorted='tg_id';flagSorted=!flagSorted">Telegram id</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="propertySorted='role_id';flagSorted=!flagSorted">Role id</CTableHeaderCell>
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
          <CButton color="warning" class="me-3" @click="modalUser = true; flagModal = false; temp_user = user; validateAddOrClear(true)">
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

  <CModal alignment="center" scrollable
          :visible="modalUser"
          @close="() => { modalUser = false; tempUserClear(); validateAddOrClear(false) }">
    <CForm class="row g-3 needs-validation" >
      <CModalHeader>
        <CModalTitle>{{ flagModal ? 'Добавление пользователя' : 'Редактирование пользователя' }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCol xs="12">
          <CFormLabel for="first_name">Имя</CFormLabel>
          <CInputGroup class="has-validation">
            <CFormInput id="first_name" value="" aria-describedby="inputGroupPrepend" required
                        v-model="temp_user.first_name" placeholder="Иван"
                        feedbackInvalid="Поле не может быть пустым"
                        v-on:input="validate.first_name=true"
                        :valid="(temp_user.first_name!==''&&temp_user.first_name!==null)&&validate.first_name===true"
                        :invalid="(temp_user.first_name===''||temp_user.first_name===null)&&validate.first_name===true"/>
          </CInputGroup>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="second_name">Фамилия</CFormLabel>
          <CFormInput id="second_name" placeholder="Иванов" v-model="temp_user.second_name" required
                      feedbackInvalid="Поле не может быть пустым"
                      v-on:input="validate.second_name=true"
                      :valid="(temp_user.second_name!==''&&temp_user.second_name!==null)&&validate.second_name===true"
                      :invalid="(temp_user.second_name===''||temp_user.second_name===null)&&validate.second_name===true"/>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="tg_id">TG id</CFormLabel>
          <CFormInput id="tg_id" placeholder="123456789" v-model="temp_user.tg_id" required
                      :feedbackInvalid="temp_user.tg_id==='' || temp_user.tg_id===null
                      ? 'Поле не может быть пустым'
                      : 'Поле может содержать только цифры'"
                      v-on:input="validate.tg_id=true"
                      :valid="/^[1-9]\d*$/.test(temp_user.tg_id)===true&&validate.tg_id===true"
                      :invalid="/^[1-9]\d*$/.test(temp_user.tg_id)===false&&validate.tg_id===true"/>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="role_id">Роль</CFormLabel>
          <CFormSelect id="role_id" v-model="temp_user.role_id"
                       feedbackInvalid="Поле не может быть пустым" required
                       v-on:input="validate.role_id=true"
                       :valid="(temp_user.role_id!==''&&temp_user.role_id!==null)&&validate.role_id===true"
                       :invalid="(temp_user.role_id===''||temp_user.role_id===null)&&validate.role_id===true">
            <option selected="" value="">Выберите роль...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </CFormSelect>
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { modalUser = false; tempUserClear(); validateAddOrClear(false) }">
          Закрыть
        </CButton>
        <CButton color="primary" type="button" @click="() => { checkValidateModal(temp_user)}">Добавить</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Users",
  data() {
    return {
      flagModal: null,
      modalUser: false,
      flagSorted: true,
      propertySorted: null,
      temp_user: { first_name: null, second_name: null, tg_id: null, role_id: null },
      validate: { first_name: false, second_name: false, tg_id: false, role_id: false }
    }
  },
  computed: {
    ...mapGetters(['totalPagesCount']),
    sortedUsers() {
      let property = this.propertySorted
      let flagSorted = this.flagSorted
      if (property !== null) {
        return this.$store.getters.allUsers.sort((a, b) => {
          if (flagSorted === true) {
            if (a[property] < b[property]) {
              return -1;
            }
            if (a[property] > b[property]) {
              return 1;
            }
            return 0;
          } else {
            if (a[property] > b[property]) {
              return -1;
            }
            if (a[property] < b[property]) {
              return 1;
            }
            return 0;
          }
        })
      } else
        return this.$store.getters.allUsers
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
      if ( user.first_name!=='' && user.first_name!==null
          && user.second_name!=='' && user.second_name!==null
          && user.tg_id!=='' && user.tg_id!==null
          && user.role_id!=='' && user.role_id!==null
          && /^[1-9]\d*$/.test(user.tg_id)) {
        /*if (!this.flagModal) {
          user.id = Number(user.id)
        }*/
        user.first_name = String(user.first_name)
        user.second_name = String(user.second_name)
        user.tg_id = Number(user.tg_id)
        user.role_id = Number(user.role_id)

        if (this.flagModal) {
          this.addUser(user)
        } else {
          this.editingUser(user)
        }

        if (!this.flagModal) { delete this.temp_user['id']  }
        this.modalUser = false; this.flagModal=null;
        this.validateAddOrClear(false)
        this.tempUserClear();
      } else
        this.validateAddOrClear(true)
    },
    tempUserClear() {
      for (let key in this.temp_user) {this.temp_user[key]=null}
    },
    validateAddOrClear(check) {
      if(check)
        for (let key in this.validate) {this.validate[key]=true}
      else
        for (let key in this.validate) {this.validate[key]=false}
    }
  },
  async mounted() {
    await this.getAllUsers();
    this.tempUserClear()
  }
}
</script>

<style scoped>

</style>
