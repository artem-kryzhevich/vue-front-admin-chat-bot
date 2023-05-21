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
                          @click="passingASortingParameter('id')">
                          <p class="d-flex m-0 justify-content-between align-items-center">
                            ID
                            <CIcon v-if="!getFlagSorted" icon="cilCaretBottom" size="custom-size" :height="12"/>
                            <CIcon v-else icon="cilCaretTop" size="custom-size" :height="12"/>
                          </p>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'title' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('title')">
                          <p class="d-flex m-0 justify-content-between align-items-center">
                            Название
                            <CIcon v-if="!getFlagSorted" icon="cilCaretBottom" size="custom-size" :height="12"/>
                            <CIcon v-else icon="cilCaretTop" size="custom-size" :height="12"/>
                          </p>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'slug' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('slug')">
                          <p class="d-flex m-0 justify-content-between align-items-center">
                            Кодовое слово
                            <CIcon v-if="!getFlagSorted" icon="cilCaretBottom" size="custom-size" :height="12"/>
                            <CIcon v-else icon="cilCaretTop" size="custom-size" :height="12"/>
                          </p>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'price' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('price')">
                          <p class="d-flex m-0 justify-content-between align-items-center">
                            Цена (RUB)
                            <CIcon v-if="!getFlagSorted" icon="cilCaretBottom" size="custom-size" :height="12"/>
                            <CIcon v-else icon="cilCaretTop" size="custom-size" :height="12"/>
                          </p>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'price_usd' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('price_usd')">
                          <p class="d-flex m-0 justify-content-between align-items-center">
                            Цена (USD)
                            <CIcon v-if="!getFlagSorted" icon="cilCaretBottom" size="custom-size" :height="12"/>
                            <CIcon v-else icon="cilCaretTop" size="custom-size" :height="12"/>
                          </p>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'description' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('description')">
                          <p class="d-flex m-0 justify-content-between align-items-center">
                            Описание
                            <CIcon v-if="!getFlagSorted" icon="cilCaretBottom" size="custom-size" :height="12"/>
                            <CIcon v-else icon="cilCaretTop" size="custom-size" :height="12"/>
                          </p>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'duration' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('duration')">
                          <p class="d-flex m-0 justify-content-between align-items-center">
                            Период
                            <CIcon v-if="!getFlagSorted" icon="cilCaretBottom" size="custom-size" :height="12"/>
                            <CIcon v-else icon="cilCaretTop" size="custom-size" :height="12"/>
                          </p>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="getPropertySorted === 'can_buy_muliple_times' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="getFlagSorted ? 1 : -1"
                          @click="passingASortingParameter('can_buy_muliple_times')">
                          <p class="d-flex m-0 justify-content-between align-items-center">
                            Многоразовая покупка
                            <CIcon v-if="!getFlagSorted" icon="cilCaretBottom" size="custom-size" :height="12"/>
                            <CIcon v-else icon="cilCaretTop" size="custom-size" :height="12"/>
                          </p>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in getData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.title }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.slug }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.price }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.price_usd }}</CTableDataCell>
        <CTableDataCell class="text-one-line" :style="!data.description ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          {{ data.description ? data.description : 'Не заданно' }}</CTableDataCell>
        <CTableDataCell class="text-one-line" :style="!data.duration ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'">
          {{ data.duration ? minutesToTimeStruct(data.duration) : 'Не заданно'  }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.can_buy_muliple_times ? 'Да' : 'Нет' }}</CTableDataCell>
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

  <items_modal :state="state" :modalOpen="modalOpen" :modalTitle="modalTitle" :modalButton="modalButton"
               :flagModal="flagModal" :feedbackInvalidInput="feedbackInvalidInput" :closeModal="closeModal"
               :validateInput="validateInput" :validOrInvalidInput="validOrInvalidInput"
               :checkValidateModal="checkValidateModal" :textAreaAdjust="textAreaAdjust"
               :minutesToTimeStruct="minutesToTimeStruct"></items_modal>

  <search_modal :modalSearchOpen="modalSearchOpen" :closeSearchModal="closeSearchModal" :openSearchModal="openSearchModal"
                :getFlagQuery="getFlagQuery" :getQuery="getQuery" :getAllData="getAllData"
                :getKeysData="getKeysData"></search_modal>
</template>

<script>
import main from "@/mixins/main";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateItems";
import minutesToTimeStruct from "@/mixins/minutesToTimeStruct";
import {setValidDataItems} from "@/mixins/setValidDataCRUD";
import Items_modal from "@/views/CRUD/modals/Items_modal";
import Search_modal from "@/views/CRUD/modals/search_modal";

export default {
  name: "Items",
  components: {Items_modal, Search_modal},
  mixins: [main, minutesToTimeStruct],
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  methods: {
    setValidData(state) {
      return setValidDataItems(state, this.flagModal)
    }
  }
}
</script>

<style scoped>

</style>
