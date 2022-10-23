<template>
  <CContainer fluid>
    <CRow>
      <template v-for="obj in $router.currentRoute.value.matched">
        <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center text-black"
              v-if="$router.currentRoute.value.path === obj.path && obj.name !== ''">
          {{ obj.name }}
        </CCol>
      </template>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="success" @click="openAddModal" class="btn-white me-3">
          <CIcon icon="cil-plus"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CAlert color="dark" v-if="getNotify.length <= 0">В базе данных нет записей!</CAlert>
  <CTable bordered hover responsive class="table-fixed mb-0" v-if="getNotify.length > 0">
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col">ID</CTableHeaderCell>
        <CTableHeaderCell scope="col">Дата и время рассылки</CTableHeaderCell>
        <CTableHeaderCell scope="col">ID Видео-файлов</CTableHeaderCell>
        <CTableHeaderCell scope="col">ID Изображений</CTableHeaderCell>
        <CTableHeaderCell scope="col">Пользователи</CTableHeaderCell>
        <CTableHeaderCell scope="col">Текст</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in getNotify" :key="index">
        <CTableDataCell class="">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="">{{ $moment(data.run_time).format('LL') }}, {{ $moment(data.run_time).format('LTS') }}</CTableDataCell>
        <CTableDataCell class="" v-if="data.videos.length > 0">
          <CTable hover responsive class="table-fixed mb-0">
            <CTableBody color="light">
              <CTableRow v-for="(d, indx) in data.videos" :key="indx">
                <CTableDataCell>{{d}}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CTableDataCell>
        <CTableDataCell v-else :style="'color:var(--cui-gray-500)'">Не заданно</CTableDataCell>
        <CTableDataCell class="" v-if="data.photos.length > 0">
          <CTable hover responsive class="table-fixed mb-0">
            <CTableBody color="light">
              <CTableRow v-for="(d, indx) in data.photos" :key="indx">
                <CTableDataCell>{{d}}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CTableDataCell>
        <CTableDataCell v-else :style="'color:var(--cui-gray-500)'">Не заданно</CTableDataCell>
        <CTableDataCell class="" v-if="data.users.length > 0">
          <CTable hover responsive class="table-fixed mb-0">
            <CTableBody color="light">
              <CTableRow v-for="(d, indx) in data.users" :key="indx">
                <CTableDataCell><a :href="'/users/'+d">{{d}}</a></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CTableDataCell>
        <CTableDataCell v-else :style="'color:var(--cui-gray-500)'">Не заданно</CTableDataCell>
        <CTableDataCell :style="!data.text ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          {{ data.text ? data.text : 'Не заданно' }}</CTableDataCell>
        <CTableDataCell class="text-one-line align-text-center">
          <CButton color="warning" class="btn-white me-3" @click="openEditModal(data)">
            <CIcon icon="cil-pencil"/>
          </CButton>
          <CButton color="danger" class="btn-white" @click="methodDelete(data.id)">
            <CIcon icon="cil-trash"/>
          </CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>

  <notify_modal :state="state" :modalOpen="modalOpen" :modalTitle="modalTitle" :modalButton="modalButton"
                :flagModal="flagModal" :closeModal="closeModal" :feedbackInvalidInput="feedbackInvalidInput"
                :validateInput="validateInput" :validOrInvalidInput="validOrInvalidInput" :getRoles="getRoles"
                :checkValidateModal="checkValidateModal"></notify_modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Notify_modal from "@/views/CRUD/modals/Notify_modal";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateNotify";
import EventBus from "@/common/EventBus";

export default {
  name: "Notify",
  components: {Notify_modal},
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  data() {
    return {
      flagModal: true,
      modalOpen: false,
    }
  },
  computed: {
    ...mapGetters(['getNotify', 'getRoles']),
    modalTitle() { return this.flagModal ? 'Добавление' : 'Редактирование' },
    modalButton() { return this.flagModal ? 'Добавить' : 'Изменить' },
  },

  methods: {
    ...mapActions(['getAllNotify', 'getAllRoles', 'addDataNotify', 'editingDataNotify', 'deleteDataNotify']),
    modalOpenSwitch() {
      return this.modalOpen = !this.modalOpen
    },
    openAddModal() {
      this.modalOpenSwitch()
      this.flagModal = true
    },
    closeModal() {
      this.modalOpenSwitch()
      this.v$.$reset()
      this.clearData()
    },
    openEditModal(data) {
      this.setEditData(data)
      this.modalOpenSwitch()
      this.flagModal = false
      this.v$.$validate()
    },
    setEditData(data) {
      Object.keys(data).forEach((key) => {
        if (key === 'run_time') {
          this.state[key] = this.$moment(data[key]).toDate()
        } else if (key === 'videos' || key === 'photos' || key === 'users') {
            Object.keys(data[key]).forEach((k) => {
              this.state[key][k] = { 0: String(data[key][k]) }
            })
        } else {
          if (data[key] === null || data[key] === "")
            this.state[key] = null
          else
            this.state[key] = String(data[key])
        }
      });
    },
    clearData() {
      Object.keys(this.state).forEach(v => {
        if (v === 'videos' || v === 'photos' || v === 'users')
          this.state[v] = [{0: null}]
        else
          this.state[v] = null
      })
    },
    validOrInvalidInput(name, select, index = -1, invalid = false) {
      if (index===-1)
        invalid = this.v$[name].$invalid
      else
        invalid = this.v$[name].$each.$response.$data[index][0].$invalid

      if (select)
        return !!(!invalid && this.v$[name].$dirty)
      else
        return !!(invalid && this.v$[name].$dirty)
    },
    feedbackInvalidInput(name, index = -1) {
      if (index===-1) {
        return this.v$[name].$error ? this.v$[name].$errors[0].$message : null
      } else {
        return this.v$[name].$each.$response.$data[index][0].$error ?
            this.v$[name].$each.$response.$errors[index][0][0].$message : null
      }
    },
    validateInput(name) {
      this.v$[name].$touch()
    },
    checkValidateModal(state) {
      this.v$.$validate()
      if (!this.v$.$error) {
        let data = {
          id: this.flagModal ? null : String(state.id),
          data: this.setValidDataNotify(state)
        }
        if (this.flagModal) {
          this.addDataNotify(data).then(
              (response) => {
                this.$store.dispatch('getAllNotify')
                this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное добавление!'})
                this.closeModal()
              },
              (error) => {
                this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка добавления!'})
                if (error.response && error.response.status === 403) {
                  EventBus.dispatch("logout");
                }
              }
          )
        } else {
          this.editingDataNotify(data).then(
              (response) => {
                this.$store.dispatch('getAllNotify')
                this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное изменение!'})
                this.closeModal()
              },
              (error) => {
                this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка изменения!'})
                if (error.response && error.response.status === 403) {
                  EventBus.dispatch("logout");
                }
              })
        }
        //console.log(data)
      }
    },
    setValidDataNotify(state, data = {}) {
      data.time = Number(this.$moment(this.$moment(state.run_time).format('YYYY-MM-DD\THH:mm:ss')+'+00:00').unix());
      data.users = state.users.length === 1 && (state.users[0][0] === null || state.users[0][0] === '')
          ? [] : state.users.map(item => Number(item[0]));
      data.text = state.text === null || state.text === '' ? '' : String(state.text)
      data.videos = state.videos.length === 1 && (state.videos[0][0] === null || state.videos[0][0] === '')
          ? [] : state.videos.map(item => String(item[0]));
      data.photos = state.photos.length === 1 && (state.photos[0][0] === null || state.photos[0][0] === '')
          ? [] : state.photos.map(item => String(item[0]));
      data.role_id = state.role_id === null || state.role_id === '' ? null : Number(state.role_id)
      return data
    },
    methodDelete(id) {
      Swal.fire({
        title: 'Вы уверены?',
        text: "Вы не сможете отменить это!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085D6',
        cancelButtonColor: '#D33',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отменить',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteDataNotify(id).then(
              (response) => {
                if (response.status === 200) {
                  this.$store.dispatch('getAllNotify')
                  this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное удаление!'})
                }
              },
              (error) => {
                this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка удаления!'})
                if (error.response && error.response.status === 403) {
                  EventBus.dispatch("logout");
                }
              }
          )
        }
      })
    }
  },
  async mounted() {
    await this.getAllRoles()
    await this.getAllNotify()
  }
}
</script>

<style scoped>

</style>
