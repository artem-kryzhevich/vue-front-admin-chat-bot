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
                          v-bind:class="propertySorted === 'description' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('description')">Описание
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'emoji' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('emoji')">Эмодзи
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'form' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('form')">Форма
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'is_visible' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('is_visible')">Видимость
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in sortedData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.title }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.slug }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.description }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.emoji }}</CTableDataCell>
        <CTableDataCell class="text-one-line"><a :href="data.form">{{ data.form }}</a></CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.is_visible }}</CTableDataCell>
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
          <CFormLabel for="emoji">Эмодзи</CFormLabel>
          <CInputGroup class="has-validation">
            <CFormInput id="emoji" aria-describedby="inputGroupPrepend"
                        v-model="state.emoji" placeholder="emoji"
                        :feedbackInvalid="feedbackInvalidInput('emoji')"
                        @input="validateInput('emoji')"
                        :valid="validOrInvalidInput('emoji', true)"
                        :invalid="validOrInvalidInput('emoji', false)"/>
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
          <CFormLabel for="form">Форма</CFormLabel>
          <CInputGroup class="has-validation">
            <CFormTextarea id="form" aria-describedby="inputGroupPrepend"
                        v-model="state.form" placeholder="form" rows="2"
                        :feedbackInvalid="feedbackInvalidInput('form')"
                        @input="validateInput('form')"
                        :valid="validOrInvalidInput('form', true)"
                        :invalid="validOrInvalidInput('form', false)"/>
          </CInputGroup>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="is_visible">Видимость</CFormLabel>
          <CInputGroup class="has-validation">
            <CFormSwitch id="is_visible" aria-describedby="inputGroupPrepend"
                         v-model="state.is_visible" label="Выключите свитч, если роль не должна быть видимой!"
                         @change="validateInput('is_visible')"
                         :valid="validOrInvalidInput('is_visible', true)"
                         :invalid="validOrInvalidInput('is_visible', false)"/>
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
import {state, rules} from "@/mixins/vuelidateRole";
import sorted from "@/mixins/sorted";
import main from "@/mixins/main";
import useVuelidate from "@vuelidate/core/dist/index.esm";

export default {
  name: "Roles",
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
      data.emoji = state.emoji === null ? "" : String(state.emoji)
      data.description = state.description === null ? "" : String(state.description)
      data.form = state.form === null ? "" : String(state.form)
      data.is_visible = state.is_visible
      return data
    },
    setEditData(data) {
      this.state.title = data.title
      this.state.slug = data.slug
      this.state.emoji = data.emoji
      this.state.description = data.description
      this.state.form = data.form
      this.state.is_visible = data.is_visible
      this.state.id = data.id
    }
  }
}
</script>

<style scoped>

</style>
