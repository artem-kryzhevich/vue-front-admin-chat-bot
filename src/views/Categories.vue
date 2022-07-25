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
                          @click="passingASortingParameter('id')">id Категории
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'title' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('title')">Название
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'slug' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('slug')">Slug
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'channel_tg_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('channel_tg_id')">id Канала
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'channel_url' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('channel_url')">url Канала
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'emoji' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('emoji')">Эмодзи
        </CTableHeaderCell>
        <CTableHeaderCell scope="col"
                          v-bind:class="propertySorted === 'private_channel_tg_id' ? 'sorted' : ''"
                          v-bind:data-sorting-direction="flagSorted ? 1 : -1"
                          @click="passingASortingParameter('private_channel_tg_id')">id_private Канала
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">Действия</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow v-for="(data, index) in sortedData" :key="index">
        <CTableDataCell class="text-one-line">{{ data.id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.title }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.slug }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.channel_tg_id }}</CTableDataCell>
        <CTableDataCell class="text-one-line">
          <a :href="data.channel_url">{{ data.channel_url }}</a>
        </CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.emoji }}</CTableDataCell>
        <CTableDataCell class="text-one-line">{{ data.private_channel_tg_id }}</CTableDataCell>
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
        <CFormLabel for="channel_tg_id">id Канала</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="channel_tg_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.channel_tg_id" placeholder="channel_tg_id"
                      :feedbackInvalid="feedbackInvalidInput('channel_tg_id')"
                      @input="validateInput('channel_tg_id')"
                      :valid="validOrInvalidInput('channel_tg_id', true)"
                      :invalid="validOrInvalidInput('channel_tg_id', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="channel_url">Ссылка на канал</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="channel_url" aria-describedby="inputGroupPrepend" required
                      v-model="state.channel_url" placeholder="channel_url"
                      :feedbackInvalid="feedbackInvalidInput('channel_url')"
                      @input="validateInput('channel_url')"
                      :valid="validOrInvalidInput('channel_url', true)"
                      :invalid="validOrInvalidInput('channel_url', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="emoji">Эмодзи</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="emoji" aria-describedby="inputGroupPrepend" required
                      v-model="state.emoji" placeholder="emoji"
                      :feedbackInvalid="feedbackInvalidInput('emoji')"
                      @input="validateInput('emoji')"
                      :valid="validOrInvalidInput('emoji', true)"
                      :invalid="validOrInvalidInput('emoji', false)"/>
        </CInputGroup>
      </CCol>
      <CCol xs="12">
        <CFormLabel for="private_channel_tg_id">id Приватного канала</CFormLabel>
        <CInputGroup class="has-validation">
          <CFormInput id="private_channel_tg_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.private_channel_tg_id" placeholder="private_channel_tg_id"
                      :feedbackInvalid="feedbackInvalidInput('private_channel_tg_id')"
                      @input="validateInput('private_channel_tg_id')"
                      :valid="validOrInvalidInput('private_channel_tg_id', true)"
                      :invalid="validOrInvalidInput('private_channel_tg_id', false)"/>
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
import {rules, state} from "@/mixins/vuelidateCategories";

export default {
  name: "Categories",
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
      data.channel_tg_id = state.channel_tg_id === null ? "" : String(state.channel_tg_id)
      data.channel_url = state.channel_url === null ? "" : String(state.channel_url)
      data.emoji = state.emoji === null ? "" : String(state.emoji)
      data.private_channel_tg_id = state.private_channel_tg_id === null ? "" : String(state.private_channel_tg_id)
      return data
    },
    setEditData(data) {
      this.state.title = String(data.title)
      this.state.slug = String(data.slug)
      this.state.channel_tg_id = String(data.channel_tg_id)
      this.state.channel_url = String(data.channel_url)
      this.state.emoji = String(data.emoji)
      this.state.private_channel_tg_id = String(data.private_channel_tg_id)
      this.state.id = data.id
    }
  }
}
</script>

<style scoped>

</style>
