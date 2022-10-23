import router from "@/router";
import EventBus from "@/common/EventBus";

export function methodDelete(id) {
    Swal.fire({
        title: 'Вы уверены?',
        text: "Вы не сможете отменить это!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085D6',
        cancelButtonColor: '#D33',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отменить',
    }).then((result) => {
        if (result.isConfirmed) {
            if (router.currentRoute.value.path.replace(/^([^\/]*\/[^\/]*\/).*$/, '$1')
                .replace(/(\/*$)/, "") === '/payments-history') {
                this.$store.commit('updateUrl', router.currentRoute.value.path
                    .replace(/^([^\/]*\/[^\/]*\/).*$/, '$1')
                    .replace(/(\/*$)/, ""))
            }
            this.deleteData(id).then(
                (response) => {
                    if (response.status === 200) {
                        if (this.$store.getters.getUrlParam === null) {
                            this.$store.commit('updateUrl', this.$route.path.replace(/(\/*$)/, ""))
                            this.$store.dispatch('getAllData')
                        } else {
                            router.go(-1)
                        }
                        this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное удаление!'})
                    }
                },
                (error) => {
                    this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка удаления!'})
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                }
            )
        }
    })
}

export function openAddModal() {
    this.modalOpenSwitch()
    this.flagModal = true

    /** Для Roles **/
    if (this.$route.path.replace(/(\/*$)/, "") === '/roles') {
        this.state.is_visible = true
        this.v$.is_visible.$validate()
    }
    /** ********* **/

    /** Для Items **/
    if (this.$route.path.replace(/(\/*$)/, "") === '/items') {
        this.state.can_buy_muliple_times = true
        this.v$.can_buy_muliple_times.$validate()
    }
    /** ********* **/

    this.updateUrlPaymentsHistoryUser()

    this.booleanUniquePaymentHistoryUser()
    this.booleanUniquePaymentHistoryItem()
}

export function openEditModal(data) {
    this.setEditData(data)
    this.modalOpenSwitch()

    this.updateUrlPaymentsHistoryUser()

    this.booleanUniquePaymentHistoryUser()
    this.booleanUniquePaymentHistoryItem()

    this.flagModal = false
    this.v$.$validate()
}

export function checkValidateModal(state) {
    this.v$.$validate()
    if (!this.v$.$error) {
        let data = this.setValidData(state)
        if (this.flagModal) {
            this.addData(data).then(
                (response) => {
                    if (response.data.status_code && response.data.status_code === 404) {
                        if (response.data.detail.message === 'User not found') {
                            booleanUniquePaymentHistoryUser(false, this.state)
                            this.v$.$validate()
                        }
                        if (response.data.detail.message === 'Item not found') {
                            booleanUniquePaymentHistoryItem(false, this.state)
                            this.v$.$validate()
                        }
                    } else {
                        this.$store.commit('updateUrl', this.$route.path.replace(/(\/*$)/, ""))
                        this.$store.dispatch('getAllData')
                        this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное добавление!'})
                        this.modalOpenSwitch()
                        this.v$.$reset()
                        this.clearData()
                    }
                },
                (error) => {
                    this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка добавления!'})
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                }
            )
        } else {
            this.editingData(data).then(
                (response) => {
                    if (response.data.status_code && response.data.status_code === 404) {
                        if (response.data.detail.message === 'User not found') {
                            booleanUniquePaymentHistoryUser(false, this.state)
                            this.v$.$validate()
                        }
                        if (response.data.detail.message === 'Item not found') {
                            booleanUniquePaymentHistoryItem(false, this.state)
                            this.v$.$validate()
                        }
                    } else {
                        this.$store.commit('updateUrl', this.$route.path.replace(/(\/*$)/, ""))
                        if (this.$store.getters.getUrlParam === null) {
                            this.$store.dispatch('getAllData')
                        } else {
                            this.$store.dispatch('getAllSection')
                        }
                        this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное изменение!'})
                        this.modalOpenSwitch()
                        this.v$.$reset()
                        this.clearData()
                    }
                },
                (error) => {
                    this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка изменения!'})
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                })
        }
    }
}

export function setEditData(data) {
    Object.keys(data).forEach((key) => {
        /** Для Роли - "Обычный пользователь" (при редактировании) **/
        if (key === 'role_id' && data[key] === null) {
            this.state[key] = "-1"
        }
        /** Для Истории оплат - "expiration_date" (формат даты) **/
        else if (key === 'expiration_date') {
            this.state[key] = this.$moment(data[key]).toDate()
        } else {
            /** Для значений TRUE / FALSE были Bool **/
            if (data[key] === true || data[key] === false)
                this.state[key] = data[key]
            /** Для значений Null / '' были Null **/
            else if (data[key] === null || data[key] === "")
                this.state[key] = null
            else
                this.state[key] = String(data[key])
        }
    });
}

export function validOrInvalidInput(name, select) {
    if (select)
        return !!(!this.v$[name].$invalid && this.v$[name].$dirty)
    else
        return !!(this.v$[name].$invalid && this.v$[name].$dirty)
}

export function feedbackInvalidInput(name) {
    return this.v$[name].$error ? this.v$[name].$errors[0].$message : null
}

export function validateInput(name, param = false) {
    if (name === 'user_id' && param === true)
        this.booleanUniquePaymentHistoryUser()
    if (name === 'item_id' && param === true)
        this.booleanUniquePaymentHistoryItem()
    this.v$[name].$touch()
}

export function clearData() {
    Object.keys(this.state).forEach(v => this.state[v] = null)
}

export function booleanUniquePaymentHistoryUser(user = true, unique = this.state) {
    /** Для Payments History **/
    if (router.currentRoute.value.path.replace(/^([^\/]*\/[^\/]*\/).*$/, '$1')
            .replace(/(\/*$)/, "") === '/payments-history') {
        unique.isUniqueUser = user
    }
    /** ******************** **/
}

export function booleanUniquePaymentHistoryItem(item = true, unique = this.state) {
    /** Для Payments History **/
    if (router.currentRoute.value.path.replace(/^([^\/]*\/[^\/]*\/).*$/, '$1')
        .replace(/(\/*$)/, "") === '/payments-history') {
        unique.isUniqueItem = item
    }
    /** ******************** **/
}
