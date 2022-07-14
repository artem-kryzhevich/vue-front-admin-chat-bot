<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center">Пользователи
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="success" class="me-3">
          <CIcon icon="cil-plus"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CTable bordered hover>
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col" @click="propertySorted='id'">id Пользователя</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="propertySorted='first_name'">Имя в Telegram</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="propertySorted='second_name'">Фамилия в Telegram</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="propertySorted='tg_id'">Telegram id</CTableHeaderCell>
        <CTableHeaderCell scope="col" @click="propertySorted='role_id'">Role id</CTableHeaderCell>
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
          <CButton color="warning" class="me-3"><CIcon icon="cil-pencil"/></CButton>
          <CButton color="danger" @click="methodDeleteUser(user)"><CIcon icon="cil-trash"/></CButton>
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
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Users",
  data() {
    return {
      propertySorted: null
    }
  },
  computed: {
    ...mapGetters(['totalPagesCount']),
    sortedUsers() {
      let property = this.propertySorted
      if ( property !== null ) {
        return this.$store.getters.allUsers.sort(function compare(a, b) {
          if (a[property] < b[property]) {
            return -1;
          }
          if (a[property] > b[property]) {
            return 1;
          }
          return 0;
        })
      } else
        return this.$store.getters.allUsers
    }
  },
  methods: {
    ...mapActions(['getAllUsers', 'deleteUser']),
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
  },

  async mounted() {
    await this.getAllUsers();
  }
}
</script>

<style scoped>

</style>
