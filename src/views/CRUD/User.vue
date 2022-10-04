<template>
  <CContainer fluid>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center text-black">
        {{ $router.currentRoute.value.name + " - " +
          (getSection.first_name !== null && getSection.first_name !== '' && getSection.first_name !== undefined
              ? getSection.first_name + ' '
              : $router.currentRoute.value.params.id)
          + (getSection.second_name !== null && getSection.second_name !== '' && getSection.second_name !== undefined
               ? getSection.second_name
               : '')
        }}
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex align-items-center" v-if="flagEdit">
        <CIcon icon="cil-warning"/><CCardTitle class="ps-2 mb-0"> Редактирование!</CCardTitle>
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex align-items-center" v-if="!flagEdit">
        <CButton color="secondary" class="btn-payment-history btn-white ps-2 mb-0" @click="pushOnRoutePaymentHistoryUser(getSection.id)">
          Получить историю оплаты пользователя
        </CButton>
      </CCol>
      <CCol class="mb-1 pt-1 pb-1 bg-white d-flex justify-content-end">
        <CButton color="warning" class="btn-white me-3" @click="editInputsSection(getSection)">
          <CIcon icon="cil-pencil"/>
        </CButton>
        <CButton color="danger" class="btn-white" @click="methodDelete(getSection.id)">
          <CIcon icon="cil-trash"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
  <CTable bordered hover responsive class="table-fixed mb-0">
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell scope="col">Название</CTableHeaderCell>
        <CTableHeaderCell scope="col">Значение</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody color="light">
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">ID</CTableHeaderCell>
        <CTableDataCell>{{ getSection.id }}</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Имя</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.first_name }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="first_name" value="" aria-describedby="inputGroupPrepend"
                      v-model="state.first_name" placeholder="Иван"
                      :feedbackInvalid="feedbackInvalidInput('first_name')"
                      @input="validateInput('first_name')"
                      :valid="validOrInvalidInput('first_name', true)"
                      :invalid="validOrInvalidInput('first_name', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Фамилия</CTableHeaderCell>
        <CTableDataCell :style="!getSection.second_name ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'"
                        v-if="!flagEdit">{{ getSection.second_name ? getSection.second_name : 'Не заданно' }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="second_name" aria-describedby="inputGroupPrepend" required
                      v-model="state.second_name" placeholder="Иван"
                      :feedbackInvalid="feedbackInvalidInput('second_name')"
                      @input="validateInput('second_name')"
                      :valid="validOrInvalidInput('second_name', true)"
                      :invalid="validOrInvalidInput('second_name', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Номер телефона</CTableHeaderCell>
        <CTableDataCell :style="!getSection.phone_number ? 'color:var(--cui-gray-500)' : 'color:var(--cui-body-color)'"
                        v-if="!flagEdit">{{ getSection.phone_number ? getSection.phone_number : 'Не заданно' }}
        </CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="phone_number" aria-describedby="inputGroupPrepend" required
                      v-model="state.phone_number" placeholder="7123456789"
                      :feedbackInvalid="feedbackInvalidInput('phone_number')"
                      @input="validateInput('phone_number')"
                      :valid="validOrInvalidInput('phone_number', true)"
                      :invalid="validOrInvalidInput('phone_number', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Telegram ID</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getSection.tg_id }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormInput id="telegram_id" aria-describedby="inputGroupPrepend" required
                      v-model="state.tg_id" placeholder="123456789"
                      :feedbackInvalid="feedbackInvalidInput('tg_id')"
                      @input="validateInput('tg_id')"
                      :valid="validOrInvalidInput('tg_id', true)"
                      :invalid="validOrInvalidInput('tg_id', false)"/>
        </CInputGroup>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row" v-bind:style="'width: 250px'">Роль</CTableHeaderCell>
        <CTableDataCell v-if="!flagEdit">{{ getRoles[getSection.role_id]
            ? getRoles[getSection.role_id] : 'Пользователь' }}</CTableDataCell>
        <CInputGroup class="has-validation" v-if="flagEdit">
          <CFormSelect id="role_id" aria-describedby="inputGroupPrepend" required
                       v-model="state.role_id"
                       :feedbackInvalid="feedbackInvalidInput('role_id')"
                       @input="validateInput('role_id')"
                       :valid="validOrInvalidInput('role_id', true)"
                       :invalid="validOrInvalidInput('role_id', false)">
            <option selected="" value="">Выберите роль...</option>
            <option :value="-1">Пользователь</option>
            <option v-for="([id, title], index) in Object.entries(getRoles)"
                    :value="id" :key="index">{{ title }}
            </option>
          </CFormSelect>
        </CInputGroup>
      </CTableRow>
      <CTableRow v-if="flagEdit">
        <CTableHeaderCell  colspan="2" class="text-end" v-bind:style="'width: 250px'">
          <CButton color="secondary" class="btn-white me-3" @click="cancellationEdit">Отменить</CButton>
          <CButton color="primary" type="button" class="btn-white" @click="checkValidateEditInputs(state)">Изменить
          </CButton>
        </CTableHeaderCell>
      </CTableRow>
    </CTableBody>

  </CTable>

  <ChartStatistics :chartsData="chartsDataUserId"
                   :chartsDataTitle="chartsLabels.chartsDataUserId"
                   :chartsLoader="chartsLoader.chartsDataUserId"
                   :updateChartsData="updateChartsButtonData"
                   :chartsButtons="chartsButtons.chartsDataUserId"
                   :nameComponent="{
                     name: 'chartsDataUserId', nameGetter: 'getStatisticsUserId', nameLabel: 'Комментарии пользователя',
                     nameAll: 'getAllStatisticsUserId'
                   }"
                   :updateChartsButtons="updateChartsButtons"
                   :updateChartsSelect="updateChartsSelect"
                   :paramUser="paramUser"></ChartStatistics>

</template>

<script>
import section from "@/mixins/section";
import {mapGetters, mapMutations} from "vuex";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {rules, state} from "@/mixins/vuelidateUser";
import {setValidDataUser} from "@/mixins/setValidDataCRUD";
import ChartStatistics from "@/views/Charts/ChartStatistics";
import statistics from "@/mixins/statistics";

export default {
  name: "User",
  components: {ChartStatistics},
  mixins: [section, statistics],
  data() {
    return {
      paramUser: false,
      chartsDataUserId: {},
      chartsLabels: {
        chartsDataUserId: 'Статистика по Количеству комментариев оставленных пользователем'
      },
      chartsLoader: {
        chartsDataUserId: false
      },
      chartsButtons: {
        chartsDataUserId: {
          default: true,
          month: false,
          year: false
        }
      }
    }
  },
  setup() {

    const v$ = useVuelidate(rules, state)
    return {state, v$}
  },
  computed: {
    ...mapGetters(['getRoles', 'getSelectedUserId'])
  },
  methods: {
    ...mapMutations(['updateSelectedUserId']),
    setValidData(state) {
      return setValidDataUser(state)
    },
    getAllStatisticsUserId() {
      if (this.getSelectedUserId !== null && this.getSelectedUserId !== '') {
        this.getAllStatistic('/statistics/user_' + this.getSelectedUserId, 'updateStatisticsUserId',
            'chartsDataUserId', 'getStatisticsUserId',
            'Комментарии пользователя')
      }
    }
  }
}
</script>

<style scoped>

</style>
