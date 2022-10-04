<template>
  <CContainer fluid>
    <CRow v-for="obj in $router.currentRoute.value.matched">
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-start align-items-center text-black"
            v-if="$router.currentRoute.value.path === obj.path && obj.name !== ''">
        {{ obj.name }}
      </CCol>
    </CRow>
    <CRow>
      <CCol class="mb-1 pt-1 pb-1 fs-6 fw-bold bg-white d-flex justify-content-end align-items-center text-black">
        <CButton color="primary" class="float-end" @click="updateAllStatistics">
          Обновить всю статистику
          <CIcon icon="cilReload"/>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>

  <ChartStatistics :chartsData="chartsDataMenu"
                   :chartsDataTitle="chartsLabels.chartsDataMenu"
                   :chartsLoader="chartsLoader.chartsDataMenu"
                   :updateChartsData="updateChartsButtonData"
                   :chartsButtons="chartsButtons.chartsDataMenu"
                   :nameComponent="{
                     name: 'chartsDataMenu', nameGetter: 'getStatisticsMenu', nameLabel: 'Уникальные переходы',
                     nameAll: 'getAllStatisticsMenu'
                   }"
                   :updateChartsButtons="updateChartsButtons"
                   :updateChartsSelect="updateChartsSelect"></ChartStatistics>

  <ChartStatistics :chartsData="chartsDataUniqueUsers"
                   :chartsDataTitle="chartsLabels.chartsDataUniqueUsers"
                   :chartsLoader="chartsLoader.chartsDataUniqueUsers"
                   :updateChartsData="updateChartsButtonData"
                   :chartsButtons="chartsButtons.chartsDataUniqueUsers"
                   :nameComponent="{
                     name: 'chartsDataUniqueUsers', nameGetter: 'getStatisticsUniqueUsers', nameLabel: 'Подписки',
                     nameAll: 'getAllStatisticsUniqueUsers'
                   }"
                   :updateChartsButtons="updateChartsButtons"
                   :updateChartsSelect="updateChartsSelect"></ChartStatistics>

  <ChartStatistics :chartsData="chartsDataEndedSubs"
                   :chartsDataTitle="chartsLabels.chartsDataEndedSubs"
                   :chartsLoader="chartsLoader.chartsDataEndedSubs"
                   :updateChartsData="updateChartsButtonData"
                   :chartsButtons="chartsButtons.chartsDataEndedSubs"
                   :nameComponent="{
                     name: 'chartsDataEndedSubs', nameGetter: 'getStatisticsEndedSubs', nameLabel: 'Просроченных подписки',
                     nameAll: 'getAllStatisticsEndedSubs'
                   }"
                   :updateChartsButtons="updateChartsButtons"
                   :updateChartsSelect="updateChartsSelect"></ChartStatistics>

  <ChartStatistics :chartsData="chartsDataRenewedSubs"
                   :chartsDataTitle="chartsLabels.chartsDataRenewedSubs"
                   :chartsLoader="chartsLoader.chartsDataRenewedSubs"
                   :updateChartsData="updateChartsButtonData"
                   :chartsButtons="chartsButtons.chartsDataRenewedSubs"
                   :nameComponent="{
                     name: 'chartsDataRenewedSubs', nameGetter: 'getStatisticsRenewedSubs',
                     nameLabel: 'Обновлённые подписки', nameAll: 'getAllStatisticsRenewedSubs'}"
                   :updateChartsButtons="updateChartsButtons"
                   :updateChartsSelect="updateChartsSelect"></ChartStatistics>

  <ChartStatistics :chartsData="chartsDataPurchases"
                   :chartsDataTitle="chartsLabels.chartsDataPurchases"
                   :chartsLoader="chartsLoader.chartsDataPurchases"
                   :updateChartsData="updateChartsButtonData"
                   :chartsButtons="chartsButtons.chartsDataPurchases"
                   :nameComponent="{
                     name: 'chartsDataPurchases', nameGetter: 'getStatisticsPurchases', nameLabel: 'Покупки',
                     nameAll: 'getAllStatisticsPurchases'
                   }"
                   :updateChartsButtons="updateChartsButtons"
                   :updateChartsSelect="updateChartsSelect"></ChartStatistics>

  <ChartStatistics :chartsData="chartsDataPurchasesFromFunnel"
                   :chartsDataTitle="chartsLabels.chartsDataPurchasesFromFunnel"
                   :chartsLoader="chartsLoader.chartsDataPurchasesFromFunnel"
                   :updateChartsData="updateChartsButtonData"
                   :chartsButtons="chartsButtons.chartsDataPurchasesFromFunnel"
                   :nameComponent="{
                     name: 'chartsDataPurchasesFromFunnel', nameGetter: 'getStatisticsPurchasesFromFunnel',
                     nameLabel: 'Покупки с Бота-Воронки', nameAll: 'getAllStatisticsPurchasesFromFunnel' }"
                   :updateChartsButtons="updateChartsButtons"
                   :updateChartsSelect="updateChartsSelect"></ChartStatistics>

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
                   :updateChartsSelect="updateChartsSelect"></ChartStatistics>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ChartStatistics from "@/views/Charts/ChartStatistics";
import EventBus from "@/common/EventBus";

export default {
  name: "Statistics",
  components: {ChartStatistics},
  data() {
    return {
      chartsDataMenu: {},
      chartsDataUniqueUsers: {},
      chartsDataEndedSubs: {},
      chartsDataRenewedSubs: {},
      chartsDataPurchases: {},
      chartsDataPurchasesFromFunnel: {},
      chartsDataUserId: {},
      chartsLabels: {
        chartsDataMenu: 'Статистика по Уникальным переходам в меню',
        chartsDataUniqueUsers: 'Статистика по Количеству подписок',
        chartsDataEndedSubs: 'Статистика по Количеству просроченных подписок',
        chartsDataRenewedSubs: 'Статистика по Количеству обновлённых подписок',
        chartsDataPurchases: 'Статистика по Количеству покупок',
        chartsDataPurchasesFromFunnel: 'Статистика по Количеству покупок с Бота-Воронки',
        chartsDataUserId: 'Статистика по Количеству комментариев оставленных пользователем'
      },
      chartsLoader: {
        chartsDataMenu: false,
        chartsDataUniqueUsers: false,
        chartsDataEndedSubs: false,
        chartsDataRenewedSubs: false,
        chartsDataPurchases: false,
        chartsDataPurchasesFromFunnel: false,
        chartsDataUserId: false
      },
      chartsButtons: {
        chartsDataMenu: {
          default: true,
          month: false,
          year: false
        },
        chartsDataUniqueUsers: {
          default: true,
          month: false,
          year: false
        },
        chartsDataEndedSubs: {
          default: true,
          month: false,
          year: false
        },
        chartsDataRenewedSubs: {
          default: true,
          month: false,
          year: false
        },
        chartsDataPurchases: {
          default: true,
          month: false,
          year: false
        },
        chartsDataPurchasesFromFunnel: {
          default: true,
          month: false,
          year: false
        },
        chartsDataUserId: {
          default: true,
          month: false,
          year: false
        },
      }
    }
  },
  computed: {
    ...mapGetters(['getStatisticsMenu', 'getStatisticsUniqueUsers', 'getStatisticsEndedSubs',
      'getStatisticsRenewedSubs', 'getStatisticsPurchases', 'getStatisticsPurchasesFromFunnel',
      'getStatisticsUserId', 'getSelectedUserId'])
  },
  methods: {
    ...mapActions(['getAllStatistics']),
    getAllStatistic(url, nameUpdate, nameData, nameGetter, label) {
      this.chartsLoader[nameData] = false
      this.getAllStatistics(url).then(
          (response) => {
            this.$store.commit(nameUpdate, response.data)
            this.updateChartsData(nameData, nameGetter, label)
            this.chartsLoader[nameData] = true
          },
          (error) => {
            this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка! Обновите блок - ' + label})
            if (error.response && error.response.status === 403) {
              EventBus.dispatch("logout");
            }
          }
      )
    },
    updateChartsData(name, nameGetter, lab, count = 50) {
      if (this.$store.getters[nameGetter].length !== 0) {
        let array = this.$_.takeRight(this.$store.getters[nameGetter], count)
        let labels = array.map((item) => {
              let start = this.$moment(item.start_date).format('DD.MM')
              let end = this.$moment(item.end_date).format('DD.MM')
              return start + " - " + end
            }
        )
        let value = array.map(item => item.value)
        this[name] = {
          labels: labels,
          value: value,
          label: lab
        }
      } else {
        this[name] = {}
      }
    },

    updateChartDataMonthYearValid(nameData, nameLabel, array) {
      if (array.length !== 0) {
        let labels = array.map((item) => {
              let start = this.$moment(item.start_date).format('DD.MM')
              let end = this.$moment(item.end_date).format('DD.MM')
              return start + " - " + end
            }
        )
        let value = array.map(item => item.value)
        this[nameData] = {
          labels: labels,
          value: value,
          label: nameLabel
        }
      } else {
        this[nameData] = {}
      }
    },

    updateChartDataMonthOrYear(nameData, nameGetter, nameLabel, select, format) {
      let arr = this.$store.getters[nameGetter]
      let array = arr.filter(item => {
        if (this.$moment(item.start_date).format(format) === select ||
            this.$moment(item.end_date).format(format) === select)
          return item
      })
      this.updateChartDataMonthYearValid(nameData, nameLabel, array)
    },

    updateChartDataMonthAndYear(nameData, nameGetter, nameLabel, select, select2) {
      let arr = this.$store.getters[nameGetter]
      let array = arr.filter(item => {
        if ((this.$moment(item.start_date).format('MM') === select ||
                this.$moment(item.end_date).format('MM') === select) &&
            (this.$moment(item.start_date).format('YYYY') === select2 ||
                this.$moment(item.end_date).format('YYYY') === select2))
          return item
      })
      this.updateChartDataMonthYearValid(nameData, nameLabel, array)
    },

    updateChartDataMonthYear(nameData, nameGetter, nameLabel, select = null, select2 = null) {
      if (this.$store.getters[nameGetter].length !== 0) {
        if (select !== null && select2 === null) {
          this.updateChartDataMonthOrYear(nameData, nameGetter, nameLabel, select, 'MM')
        } else if (select === null && select2 !== null) {
          this.updateChartDataMonthOrYear(nameData, nameGetter, nameLabel, select2, 'YYYY')
        } else if (select !== null && select2 !== null) {
          this.updateChartDataMonthAndYear(nameData, nameGetter, nameLabel, select, select2)
        }
      }
    },

    updateChartsButtons(name, nameComponent) {
      if (name === 'default') {
        this.chartsButtons[nameComponent].month = false
        this.chartsButtons[nameComponent].year = false
      } else if (name === 'month') {
        this.chartsButtons[nameComponent].default =
            this.chartsButtons[nameComponent].year === false && this.chartsButtons[nameComponent].month === false;
      } else if (name === 'year') {
        this.chartsButtons[nameComponent].default =
            this.chartsButtons[nameComponent].month === false && this.chartsButtons[nameComponent].year === false;
      }
    },
    updateChartsSelect(name, nameData, nameGetter, nameLabel, select, select2, select3) {
      if (this.chartsButtons[nameData].month === true && this.chartsButtons[nameData].year === false) {
        this.updateChartDataMonthYear(nameData, nameGetter, nameLabel, select2)
      } else if (this.chartsButtons[nameData].month === false && this.chartsButtons[nameData].year === true) {
        this.updateChartDataMonthYear(nameData, nameGetter, nameLabel, null, select3)
      } else if (this.chartsButtons[nameData].month === true && this.chartsButtons[nameData].year === true) {
        this.updateChartDataMonthYear(nameData, nameGetter, nameLabel, select2, select3)
      } else if (this.chartsButtons[nameData].month === false && this.chartsButtons[nameData].year === false) {
        this.updateChartsData(nameData, nameGetter, nameLabel, select)
      }
    },

    updateChartsButtonData(nameComponent, nameAll) {
      this.chartsButtons[nameComponent].default = true
      this.chartsButtons[nameComponent].month = false
      this.chartsButtons[nameComponent].year = false
      this[nameAll]()
    },

    getAllStatisticsMenu() {
      this.getAllStatistic('/statistics/menu', 'updateStatisticsMenu', 'chartsDataMenu',
          'getStatisticsMenu', 'Уникальные переходы')
    },
    getAllStatisticsUniqueUsers() {
      this.getAllStatistic('/statistics/unique_users', 'updateStatisticsUniqueUsers',
          'chartsDataUniqueUsers', 'getStatisticsUniqueUsers', 'Подписки')
    },
    getAllStatisticsEndedSubs() {
      this.getAllStatistic('/statistics/ended_subs', 'updateStatisticsEndedSubs',
          'chartsDataEndedSubs', 'getStatisticsEndedSubs', 'Просроченных подписки')
    },
    getAllStatisticsRenewedSubs() {
      this.getAllStatistic('/statistics/renewed_subs', 'updateStatisticsRenewedSubs',
          'chartsDataRenewedSubs', 'getStatisticsRenewedSubs', 'Обновлённые подписки')
    },
    getAllStatisticsPurchases() {
      this.getAllStatistic('/statistics/purchases', 'updateStatisticsPurchases',
          'chartsDataPurchases', 'getStatisticsPurchases', 'Покупки')
    },
    getAllStatisticsPurchasesFromFunnel() {
      this.getAllStatistic('/statistics/purchases_from_funnel', 'updateStatisticsPurchasesFromFunnel',
          'chartsDataPurchasesFromFunnel', 'getStatisticsPurchasesFromFunnel',
          'Покупки с Бота-Воронки')
    },
    getAllStatisticsUserId() {
      if (this.getSelectedUserId !== null && this.getSelectedUserId !== '') {
        this.getAllStatistic('/statistics/user_' + this.getSelectedUserId, 'updateStatisticsUserId',
            'chartsDataUserId', 'getStatisticsUserId',
            'Комментарии пользователя')
      }
    },

    updateAllStatistics() {
      this.getAllStatisticsMenu()
      this.getAllStatisticsUniqueUsers()
      this.getAllStatisticsEndedSubs()
      this.getAllStatisticsRenewedSubs()
      this.getAllStatisticsPurchases()
      this.getAllStatisticsPurchasesFromFunnel()
      this.getAllStatisticsUserId()
    }
  },
  mounted() {
    this.updateAllStatistics()
  }
}
</script>

<style scoped>

</style>
