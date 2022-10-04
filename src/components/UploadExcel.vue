<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <CFormInput class="custom-valid"
                  :valid="!!(!iv$.collection.$invalid && iv$.collection.$dirty)"
                  :invalid="!!(iv$.collection.$invalid && iv$.collection.$dirty)"/>
      <div v-if="!loading" class="d-inline-block">
        {{
          !!(!iv$.collection.$invalid && iv$.collection.$dirty)
              ? 'Нажмите загрузить или отмена'
              : 'Перетащите excel файл или нажмите ->'
        }}
      </div>
      <div v-if="loading" class="d-inline-block">
        {{ 'Идёт загрузка...' }}
      </div>
      <CButton
          v-bind:style="!!(!iv$.collection.$invalid && iv$.collection.$dirty) ? 'display: none' : null"
          :disabled="loading"
          color="info" class="btn-white mt-2 mb-2 ms-2" @click="handleUpload">
        <CIcon v-if="!loading" icon="cil-CloudUpload"/>
        <CSpinner v-if="loading" color="dark"
                  v-bind:style="loading ? 'width: 16px;height: 16px' : null"/>
      </CButton>
      <div v-if="!!(!iv$.collection.$invalid && iv$.collection.$dirty)"
           v-bind:style="!!(!iv$.collection.$invalid && iv$.collection.$dirty)
           ? 'display: inline-block; height: 22px; width: 42px; vertical-align: middle;' : null"
           class="mt-3 mb-3">
      </div>
    </div>
    <CAlert v-if="!!(!iv$.collection.$invalid && iv$.collection.$dirty)" color="success"
            class="d-flex align-items-center mt-3 pt-1 pb-1 mb-0">
      <CIcon icon="cil-check-circle" class="flex-shrink-0 me-2" width="24" height="24"/>
      <div>Ошибок нет!</div>
    </CAlert>
    <CAlert v-if="!!(iv$.collection.$invalid && iv$.collection.$dirty)" color="danger"
            class="d-flex align-items-center mt-3 pt-1 pb-1 mb-2">
      <CIcon icon="cil-burn" class="flex-shrink-0 me-2" width="24" height="24"/>
      <div>Ошибки в файле!</div>
    </CAlert>
    <CTable bordered v-if="iv$.collection.$silentErrors.length > 0">
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell scope="col">Строка</CTableHeaderCell>
          <CTableHeaderCell scope="col">Описание ошибки</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(error, index) in arrayCollectionErrors" :key="index">
          <CTableHeaderCell scope="row">
            {{ Number(Object.keys(error)[0]) + 2 }}
          </CTableHeaderCell>
          <CTableDataCell>
            <div v-if="iv$.collection.$each.$response.$errors[Number(Object.keys(error)[0])].tg_id.length > 0">
              {{ error[Object.keys(error)[0]].tg_id[0].$property }} -
              {{ error[Object.keys(error)[0]].tg_id[0].$message }}
            </div>
            <div v-if="iv$.collection.$each.$response.$errors[Number(Object.keys(error)[0])].first_name.length > 0">
              {{ error[Object.keys(error)[0]].first_name[0].$property }} -
              {{ error[Object.keys(error)[0]].first_name[0].$message }}
            </div>
            <div v-if="iv$.collection.$each.$response.$errors[Number(Object.keys(error)[0])].phone_number.length > 0">
              {{ error[Object.keys(error)[0]].phone_number[0].$property }} -
              {{ error[Object.keys(error)[0]].phone_number[0].$message }}
            </div>
            <div
                v-if="iv$.collection.$each.$response.$errors[Number(Object.keys(error)[0])].date_of_payment.length > 0">
              {{ error[Object.keys(error)[0]].date_of_payment[0].$property }} -
              {{ error[Object.keys(error)[0]].date_of_payment[0].$message }}
            </div>
            <div
                v-if="iv$.collection.$each.$response.$errors[Number(Object.keys(error)[0])].subscribe_end_date.length > 0">
              {{ error[Object.keys(error)[0]].subscribe_end_date[0].$property }} -
              {{ error[Object.keys(error)[0]].subscribe_end_date[0].$message }}
            </div>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <CAlert v-if="messageError !== null" color="danger"
            class="d-flex align-items-center mt-3 pt-1 pb-1 mb-2">
      <CIcon icon="cil-burn" class="flex-shrink-0 me-2" width="24" height="24"/>
      <div>{{ messageError }}</div>
    </CAlert>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import {clearData} from "@/mixins/methodsCRUD";
import {reactive} from "vue";

export default {
  name: "UploadExcel",
  props: {
    onSuccess: Function, // eslint-disable-line
    importState: Object,
    iv$: Object
  },
  data() {
    return {
      arrTitle: ['tg_id', 'first_name', 'phone_number', 'role', 'date_of_payment', 'subscribe_end_date'],
      loading: false,
      messageError: null
    }
  },
  computed: {
    arrayCollectionErrors() {
      return this.iv$.collection.$each.$response.$errors.filter((e, i) => {
        if (e.tg_id.length > 0 || e.first_name.length > 0 || e.phone_number.length > 0
            || e.date_of_payment.length > 0 || e.subscribe_end_date.length > 0)
          return this.iv$.collection.$each.$response.$errors[i]
      }).map((value, i) => (reactive({
        [this.iv$.collection.$each.$response.$errors.map((e, i) => {
          if (e.tg_id.length > 0 || e.first_name.length > 0 || e.phone_number.length > 0
              || e.date_of_payment.length > 0 || e.subscribe_end_date.length > 0)
            return i
        }).filter(e => e !== undefined && e !== null)[i]]: value
      })))
    },
  },
  methods: {
    generateData({results}) {
      this.importState.collection.results = results
      this.onSuccess && this.onSuccess(this.importState.collection)
      this.iv$.$validate()
    },
    clearData,
    handleDrop(e) {
      this.messagesError(false)
      this.iv$.$reset()
      this.importState.collection = []
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.messagesError(true, 'three')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.messagesError(true, 'two')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      this.messagesError(false)
      this.iv$.$reset()
      this.importState.collection = []
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.messagesError(true, 'two')
        return false
      }
      if (!rawFile) return
      this.upload(rawFile)
    },
    beforeUpload(file) {
      return file.size / 1024 / 1024 < 1;
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload(rawFile)) {
        this.messagesError(true, 'one')
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, {type: 'array'})
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const results = XLSX.utils.sheet_to_json(worksheet, {defval: null})

          if (this.checkTitle(results)) {
            this.generateData({results})
          } else {
            this.messagesError(true, 'four')
          }
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    isExcel(file) {
      return /\.(xlsx|xls)$/.test(file.name)
    },

    messagesError(visible, message = null) {
      if (visible === true) {
        if (message === 'one') {
          this.messageError = 'Пожалуйста, не загружайте файлы размером более 1 мегабайта!'
        } else if (message === 'two') {
          this.messageError = 'Поддерживает только загрузку файлов с расширением .xlsx, .xls !'
        } else if (message === 'three') {
          this.messageError = 'Поддержка загрузки только одного файла!'
        } else if (message === 'four') {
          this.messageError = 'Ошибка! Проверьте заголовки!'
        }
      } else {
        this.messageError = message
      }
    },

    checkTitle(results) {
      let e = true
      let objResult = Object.keys(results[0])
      if (objResult.length !== this.arrTitle.length) {
        e = false
      } else {
        for (let i = 0; i < objResult.length; i++) {
          if (this.arrTitle.indexOf(objResult[i]) === -1) {
            e = false;
            break;
          }
        }
      }
      return e
    }
  }
}
</script>

<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}

.drop {
  border: 2px dashed #bbb;
  width: 100%;
  /*height: 160px;
  line-height: 160px;*/
  margin: 0 auto;
  font-size: 18px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
