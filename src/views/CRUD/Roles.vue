<template>
  <CContainer fluid>
    <CRow v-for="obj in $router.currentRoute.value.matched">
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center text-black"
            v-if="$router.currentRoute.value.path === obj.path && obj.name !== ''">
        {{ obj.name }}
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center text-black">
        {{ getQuery !== null && getQuery !== '' && getQuery !== '{}' ? 'Результаты поиска...' : '' }}
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="info" @click="openSearchModal" class="btn-white me-3">
          <CIcon icon="cil-Search"/>
        </CButton>
        <CButton color="success" @click="openAddModal" class="btn-white me-3">
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
                          v-bind:class="getPropertySorted === 'title' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('title')">Название
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'slug' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('slug')">slug
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'description' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('description')">Описание
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'emoji' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('emoji')">Эмодзи
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'form' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('form')">Форма
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'is_visible' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('is_visible')">Видимость
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in getData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.title }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.slug }}</CTableDataCell>
        <CTableDataCell class="text-one-line" :style="!data.description ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          {{ data.description ? data.description : 'Не заданно' }}</CTableDataCell>
        <CTableDataCell class="text-one-line" :style="!data.emoji ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          {{ data.emoji ? data.emoji : 'Не заданно' }}</CTableDataCell>
        <CTableDataCell class="text-one-line" :style="!data.form ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          <a :href="data.form ? data.form : null">{{ data.form ? data.form : 'Не заданно' }}</a></CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.is_visible ? 'Да' : 'Нет' }}</CTableDataCell>
        <CTableDataCell class="text-one-line align-text-center">
          <CButton color="info" class="btn-white me-3" @click="pushOnRouteId(data.id)">
            <CIcon icon="cil-Notes"/>
          </CButton>
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

  <roles_modal :state="state" :modalOpen="modalOpen" :modalTitle="modalTitle" :modalButton="modalButton"
               :flagModal="flagModal" :feedbackInvalidInput="feedbackInvalidInput" :closeModal="closeModal"
               :validateInput="validateInput" :validOrInvalidInput="validOrInvalidInput"
               :checkValidateModal="checkValidateModal" :textAreaAdjust="textAreaAdjust"></roles_modal>

  <search_modal :modalSearchOpen="modalSearchOpen" :closeSearchModal="closeSearchModal" :openSearchModal="openSearchModal"
                :getFlagQuery="getFlagQuery" :getQuery="getQuery" :getAllData="getAllData"
                :getKeysData="getKeysData"></search_modal>
</template>

<script>
import {state, rules} from "@/mixins/vuelidateRole";
import main from "@/mixins/main";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {setValidDataRole} from "@/mixins/setValidDataCRUD";
import Roles_modal from "@/views/CRUD/modals/Roles_modal";
import Search_modal from "@/views/CRUD/modals/search_modal";

export default {
  name: "Roles",
  components: {Search_modal, Roles_modal},
  mixins: [main],
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  methods: {
    setValidData(state) {
      return setValidDataRole(state, this.flagModal)
    }
  }
}
</script>

<style scoped>

</style>
