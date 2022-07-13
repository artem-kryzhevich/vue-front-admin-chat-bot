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
  <CTable bordered hover class="table_sort">
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col" data-order="1" class="sorted">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">id</CTableHeaderCell>
        <CTableHeaderCell scope="col">Имя в Telegram</CTableHeaderCell>
        <CTableHeaderCell scope="col">Фамилия в Telegram</CTableHeaderCell>
        <CTableHeaderCell scope="col">Telegram id</CTableHeaderCell>
        <CTableHeaderCell scope="col">Role id</CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(user, index) in allUsers" :key="index">
        <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
        <CTableDataCell>{{ user.id }}</CTableDataCell>
        <CTableDataCell>{{ user.first_name }}</CTableDataCell>
        <CTableDataCell>{{ user.second_name }}</CTableDataCell>
        <CTableDataCell>{{ user.tg_id }}</CTableDataCell>
        <CTableDataCell>{{ user.role_id ? user.role_id : 'null' }}</CTableDataCell>
        <CTableDataCell style="justify-content: center; display: flex;">
          <CButton color="warning" class="me-3">
            <CIcon icon="cil-pencil"/>
          </CButton>
          <CButton color="danger" @click="method_deleteUser(user, currentPage)">
            <CIcon icon="cil-trash"/>
          </CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <paginate
      :page-count="Math.ceil(usersCount/20)"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Назад'"
      :next-text="'Вперёд'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :first-last-button="true"
      :first-button-text="'Первая'"
      :last-button-text="'Последняя'">
  </paginate>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Users",
  data() {
    return {
      currentPage: 0,
    }
  },
  computed: mapGetters(['allUsers', 'usersCount']),
  methods: {
    ...mapActions(['getAllUsers', 'deleteUser']),
    async clickCallback(pageNum) {
      this.currentPage = pageNum
      await this.getAllUsers(pageNum);

      this.sorting_default()
    },
    method_deleteUser(user, currentPage) {
      let data = {
        user: user,
        page: currentPage
      }
      console.log(data)
      Swal.fire({
        title: 'Вы уверены?',
        text: "Вы не сможете отменить это!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да, удалить пользователя '+ user.first_name,
        cancelButtonText: 'Отменить',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(data)
        }
      })
    },

    method_sorting() {
      const getSort = ({target}) => {
        // if чтобы не сортировало по последнему столбцу в таблице
        if ([...target.parentNode.cells].indexOf(target) !== document.querySelectorAll('.table_sort thead th').length - 1) {
          const order = (target.dataset.order = -(target.dataset.order || -1));
          const index = [...target.parentNode.cells].indexOf(target);
          const collator = new Intl.Collator(['en', 'ru'], {numeric: true});
          const comparator = (index, order) => (a, b) => order * collator.compare(
              a.children[index].innerHTML,
              b.children[index].innerHTML
          );
          for (const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));
          for (const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
        }
      };
      document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
    },

    sorting_default() {
      let items = document.querySelectorAll('.table_sort thead th');
      for (let i = 0; i < items.length; i++) {
        if(items[i].classList.contains('sorted')) {
          items[i].classList.remove('sorted')
        }
        items[i].removeAttribute('data-order')
      }
      items[0].classList.add('sorted')
      items[0].setAttribute('data-order', '-1')
      items[0].click()
    }
  },

  async mounted() {
    this.currentPage = 1
    await this.getAllUsers();
    this.method_sorting()
  }
}
</script>

<style scoped>

</style>
