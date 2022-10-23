import {mapActions} from "vuex";
import EventBus from "@/common/EventBus";

export default {
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
                    if (error.response && (error.response.status !== 403 || error.response.status !== 401)) {
                        this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка! Обновите блок - ' + label})
                    }
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
                let labels_years = array.map((item) => {
                        let start = this.$moment(item.start_date).format('YYYY')
                        let end = this.$moment(item.end_date).format('YYYY')
                        return start + " - " + end
                    }
                )
                let value = array.map(item => item.value)
                this[name] = {
                    labels: labels,
                    labels_years: labels_years,
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
                let labels_years = array.map((item) => {
                        let start = this.$moment(item.start_date).format('YYYY')
                        let end = this.$moment(item.end_date).format('YYYY')
                        return start + " - " + end
                    }
                )
                let value = array.map(item => item.value)
                this[nameData] = {
                    labels: labels,
                    labels_years: labels_years,
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
        }
    },
}
