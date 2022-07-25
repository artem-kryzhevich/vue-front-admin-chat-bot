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
                          @click="passingASortingParameter('id')">id Роли
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'title' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('title')">Название
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'slug' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('slug')">slug
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'price' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('price')">Цена
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'description' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('description')">Описание
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'duration' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('duration')">Период
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'can_buy_muliple_times' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('can_buy_muliple_times')">Возможность купить несколько раз
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in sortedData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.title }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.slug }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.price }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.description }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.duration }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.can_buy_muliple_times }}</CTableDataCell>
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
    <CModalHeader>
      <CModalTitle>{{ modalTitle }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="12">
        <CFormLabel for="title">Название</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="title" value="" aria-describedby="inputGroupPrepend" required
                      v-model="state.title" placeholder="title"
                      :feedbackInvalid="feedbackInvalidInput('title')"
                      @input="validateInput('title')"
                      :valid="validOrInvalidInput('title', true)"
                      :invalid="validOrInvalidInput('title', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="slug">Slug</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="slug" aria-describedby="inputGroupPrepend" required
                      v-model="state.slug" placeholder="slug"
                      :feedbackInvalid="feedbackInvalidInput('slug')"
                      @input="validateInput('slug')"
                      :valid="validOrInvalidInput('slug', true)"
                      :invalid="validOrInvalidInput('slug', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="price">Цена</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="price" aria-describedby="inputGroupPrepend" required
                      v-model="state.price" placeholder="price"
                      :feedbackInvalid="feedbackInvalidInput('price')"
                      @input="validateInput('price')"
                      :valid="validOrInvalidInput('price', true)"
                      :invalid="validOrInvalidInput('price', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="description">Описание</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormTextarea id="description" aria-describedby="inputGroupPrepend"
                         v-model="state.description" placeholder="description" rows="5"
                         :feedbackInvalid="feedbackInvalidInput('description')"
                         @input="validateInput('description')"
                         :valid="validOrInvalidInput('description', true)"
                         :invalid="validOrInvalidInput('description', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="duration">Период</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="duration" aria-describedby="inputGroupPrepend"
                      v-model="state.duration" placeholder="duration"
                      :feedbackInvalid="feedbackInvalidInput('duration')"
                      @input="validateInput('duration')"
                      :valid="validOrInvalidInput('duration', true)"
                      :invalid="validOrInvalidInput('duration', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="can_buy_muliple_times">Покупка несколько раз</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormSwitch id="can_buy_muliple_times" aria-describedby="inputGroupPrepend"
                       v-model="state.can_buy_muliple_times" label="Выключите свитч, если не нужна возможность покупать несколько раз!"
                       @change="validateInput('can_buy_muliple_times')"
                       :valid="validOrInvalidInput('can_buy_muliple_times', true)"
                       :invalid="validOrInvalidInput('can_buy_muliple_times', false)"/>
        </CInputGroup>
      </CCol>

    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModal">Закрыть</CButton>
      <CButton color="primary" type="button" @click="checkValidateModal(state)">{{ modalButton }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import sorted from "@/mixins/sorted";
import main from "@/mixins/main";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateItems";

export default {
  name: "Items",
  mixins: [sorted, main],
  setup() {
    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  methods: {
    setValidData(state) {
      let data = {};
      if (!this.flagModal) { data.id = Number(state.id) }
      data.title = state.title === null ? "" : String(state.title)
      data.slug = state.slug === null ? "" : String(state.slug)
      data.price = state.price === null ? "" : Number(state.price)
      data.description = state.description === null ? "" : String(state.description)
      data.duration = state.duration === null ? "" : Number(state.duration)
      data.can_buy_muliple_times = state.can_buy_muliple_times
      return data
    },
    setEditData(data) {
      this.state.title = data.title
      this.state.slug = data.slug
      this.state.price = data.price
      this.state.description = data.description
      this.state.duration = data.duration
      this.state.can_buy_muliple_times = data.can_buy_muliple_times
      this.state.id = data.id
    }
  }
}
</script>

<style scoped>

</style>
