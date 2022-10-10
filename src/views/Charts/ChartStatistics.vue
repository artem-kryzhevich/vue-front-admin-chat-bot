<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-center align-items-center text-black">
        <CCard class="mb-4" :style="'width: 90%'">
          <CCardBody>
            <CRow>
              <CCol class="mb-2">
                <h6 id="traffic" class="card-title mb-0">{{ chartsDataTitle }}</h6>
                <div class="small text-medium-emphasis"
                     v-if="chartsLoader === true && Object.keys(chartsData).length !== 0">
                  {{
                    chartsData.labels[0].substr(0, 5) + " - " +
                    chartsData.labels[chartsData.labels.length - 1].slice(-5)
                  }}
                </div>
              </CCol>
              <CCol class="mb-2">
                <CButton color="primary" class="float-end"
                         v-if="nameComponent.name !== 'chartsDataUserId'"
                         @click="updateChartsData(nameComponent.name, nameComponent.nameAll)">
                  Обновить
                  <CIcon icon="cilReload"/>
                </CButton>
                <CButton color="primary" class="float-end"
                         v-if="nameComponent.name === 'chartsDataUserId'
                         && getSelectedUserId !== null && getSelectedUserId !== ''"
                         @click="updateChartsData(nameComponent.name, nameComponent.nameAll)">
                  Обновить
                  <CIcon icon="cilReload"/>
                </CButton>
              </CCol>
            </CRow>
            <CRow v-if="nameComponent.name === 'chartsDataUserId'">
              <CCol xs="12" sm="8" md="6" lg="4" xl="4" xxl="3" class="mb-2">
                <CFormLabel for="user_id">ID Пользователя - {{getSelectedUserId !== null ? getSelectedUserId : null}}</CFormLabel>
                <CInputGroup v-if="paramUser === true" class="has-validation">
                  <CFormInput id="user_id" aria-describedby="inputGroupPrepend" required
                              onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ?
                              null : event.charCode >= 48 && event.charCode <= 57"
                              placeholder="ID" v-model="getStatisticUserId"/>
                  <CButton color="primary" class="float-end" @click="checkUserId"><CIcon icon="cilCheck"/></CButton>
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow class="justify-content-end" v-if="chartsLoader === true
            && $store.getters[nameComponent.nameGetter].length !== 0 && Object.keys(defaultData).length !== 0">
              <CCol xs="12" sm="12" md="12" lg="4" xl="3" xxl="2">
                <label class="form-label" for="default">по умолчанию</label>
                <CInputGroup class="flex-nowrap justify-content-start">
                  <CInputGroupText>
                    <CFormCheck type="radio" value="" v-model="selectChartsButtonDefault"/>
                  </CInputGroupText>
                    <CFormSelect id="default" class="w-100" v-model="selectData" :disabled="!chartsButtons.default">
                      <option v-for="(count, index) in getArrayData"
                              :value="String(count)" :key="index">{{ count }}
                      </option>
                    </CFormSelect>
                  <tooltip-info-content :content="'Количество последних записей статистики'"></tooltip-info-content>
                </CInputGroup>
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="3" xxl="2">
                <label class="form-label" for="limit">месяц</label>
                <CInputGroup class="flex-nowrap justify-content-start">
                  <CInputGroupText>
                    <CFormCheck type="checkbox" value="" v-model="selectChartsButtonMonth"/>
                  </CInputGroupText>
                    <CFormSelect id="months" class="w-100" v-model="selectMonth" :disabled="!chartsButtons.month">
                      <option v-for="(count, index) in getArrayMonth"
                              :value="String(count)" :key="index">{{ count }}
                      </option>
                    </CFormSelect>
                  <tooltip-info-content :content="'Статистика за месяц'"></tooltip-info-content>
                </CInputGroup>
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="3" xxl="2">
                <label class="form-label" for="limit">год</label>
                <CInputGroup class="flex-nowrap justify-content-start">
                  <CInputGroupText>
                    <CFormCheck type="checkbox" value="" v-model="selectChartsButtonYear"/>
                  </CInputGroupText>
                    <CFormSelect id="years" class="w-100" v-model="selectYear" :disabled="!chartsButtons.year">
                      <option v-for="(count, index) in getArrayYears"
                              :value="String(count)" :key="index">{{ count }}
                      </option>
                    </CFormSelect>
                  <tooltip-info-content :content="'Статистика за год'"></tooltip-info-content>
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow v-if="chartsLoader === true && Object.keys(chartsData).length !== 0
                        && Object.keys(defaultData).length !== 0">
              <CChart type="line" :wrapper="false" :data="defaultData" :key="loading" :height="100"/>
            </CRow>
            <CRow v-else-if="chartsLoader === false && Object.keys(chartsData).length === 0
                        && Object.keys(defaultData).length === 0"
                  class="justify-content-center mt-3">
              <CSpinner color="primary"/>
            </CRow>
            <CRow v-else-if="chartsLoader === true && Object.keys(chartsData).length === 0" class="mt-3">
              <CAlert class="d-flex justify-content-center bg-white">Нет данных!</CAlert>
            </CRow>
            <CRow v-else-if="getSelectedUserId === null || getSelectedUserId === ''" class="mt-3">
              <CAlert class="d-flex justify-content-center bg-white">Нет данных!</CAlert>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import {CChart} from '@coreui/vue-chartjs'
import {mapGetters, mapMutations} from "vuex";
import TooltipInfoContent from "@/components/TooltipInfoContent";

export default {
  name: "ChartStatistics",
  components: {TooltipInfoContent, CChart},
  props: ['nameComponent', 'chartsData', 'chartsDataTitle', 'chartsLoader', 'updateChartsData',
    'chartsButtons', 'updateChartsButtons', 'updateChartsSelect', 'paramUser'],
  data() {
    return {
      defaultData: {},
      loading: 0,

      selectedData: String('50'),
      selectedMonth: [... String(new Date().getUTCMonth() + 1)].length === 1
          ? String(0) +  String(new Date().getUTCMonth() + 1) :  String(new Date().getUTCMonth() + 1),
      selectedYear: String(new Date().getFullYear()),

      getStatisticUserId: null
    }
  },
  computed: {
    ...mapGetters(['getSelectedUserId']),
    getArrayData() {
      return [...Array(10).keys()].map(i => (10+i*10))
    },
    getArrayMonth() {
      return Array(12).fill().map((e, i) => {
        if (i + 1 < 10) {
          return String(0) + String(i + 1)
        } else
          return String(i + 1)
      })
    },
    getArrayYears() {
      const startFrom = new Date('2020');
      const today = new Date();
      const years = []
      do {
        const year = startFrom.getFullYear();
        years.push(year)
      } while (startFrom.setFullYear(startFrom.getFullYear() + 1) < today);

      return years
    },
    selectChartsButtonDefault: {
      get() {
        return this.chartsButtons.default
      },
      set(value) {
        this.chartsButtons.default = value
        this.updateChartsButtons('default', this.nameComponent.name)
        this.updateChartsSelect('default',
            this.nameComponent.name, this.nameComponent.nameGetter, this.nameComponent.nameLabel, this.selectedData, this.selectedMonth, this.selectedYear)
      }
    },
    selectChartsButtonMonth: {
      get() {
        return this.chartsButtons.month
      },
      set(value) {
        this.chartsButtons.month = value
        this.updateChartsButtons('month', this.nameComponent.name)
        this.updateChartsSelect('month',
            this.nameComponent.name, this.nameComponent.nameGetter, this.nameComponent.nameLabel, this.selectedData, this.selectedMonth, this.selectedYear)
      }
    },
    selectChartsButtonYear: {
      get() {
        return this.chartsButtons.year
      },
      set(value) {
        this.chartsButtons.year = value
        this.updateChartsButtons('year', this.nameComponent.name)
        this.updateChartsSelect('year',
            this.nameComponent.name, this.nameComponent.nameGetter, this.nameComponent.nameLabel, this.selectedData, this.selectedMonth, this.selectedYear)
      }
    },
    selectData: {
      get() { return String(this.selectedData) },
      set(value) {
        this.selectedData = String(value)
        this.updateChartsSelect('default',
            this.nameComponent.name, this.nameComponent.nameGetter, this.nameComponent.nameLabel,  this.selectedData, this.selectedMonth, this.selectedYear)
      }
    },
    selectMonth: {
      get() { return String(this.selectedMonth) },
      set(value) {
        this.selectedMonth = String(value)
        this.updateChartsSelect('month',
            this.nameComponent.name, this.nameComponent.nameGetter, this.nameComponent.nameLabel,  this.selectedData, this.selectedMonth, this.selectedYear)
      }
    },
    selectYear: {
      get() { return String(this.selectedYear) },
      set(value) {
        this.selectedYear = String(value)
        this.updateChartsSelect('year',
            this.nameComponent.name, this.nameComponent.nameGetter, this.nameComponent.nameLabel,  this.selectedData, this.selectedMonth, this.selectedYear)
      }
    },
  },
  watch: {
    chartsData(to, from) {
      if (to !== from) {
        this.defaultData = {
          labels: to.labels,
          datasets: [
            {
              label: to.label,
              backgroundColor: 'rgba(151, 187, 205, 0.2)',
              borderColor: 'rgba(151, 187, 205, 1)',
              pointBackgroundColor: 'rgba(151, 187, 205, 1)',
              pointBorderColor: '#fff',
              data: to.value
            },
          ]
        }
        this.loading += 1
      }
    }
  },
  methods: {
    ...mapMutations(['updateSelectedUserId']),
    checkUserId() {
      this.updateSelectedUserId(this.getStatisticUserId)
      if(this.getSelectedUserId !== null && this.getSelectedUserId !== '') {
        this.updateChartsData(this.nameComponent.name, this.nameComponent.nameAll)
      } else {
        this.defaultData = {}
      }
    }
  }
}
</script>

<style scoped>

</style>
