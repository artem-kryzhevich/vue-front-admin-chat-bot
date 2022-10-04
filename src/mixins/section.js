import {mapActions, mapGetters, mapMutations} from "vuex";
import {
    booleanUniquePaymentHistoryItem,
    booleanUniquePaymentHistoryUser,
    clearData,
    feedbackInvalidInput,
    methodDelete,
    setEditData,
    validateInput,
    validOrInvalidInput
} from "@/mixins/methodsCRUD";
import EventBus from "@/common/EventBus";

export default {
    data() {
        return {
            flagEdit: false
        }
    },
    computed: {
        ...mapGetters(['getSection'])
    },
    methods: {
        ...mapActions(['getAllSection', 'getAllRoles', 'editingData', 'deleteData']),
        ...mapMutations(['updateUrl', 'updateUrlParam']),
        methodDelete,
        validOrInvalidInput,
        feedbackInvalidInput,
        validateInput,
        setEditData,
        clearData,
        booleanUniquePaymentHistoryUser,
        booleanUniquePaymentHistoryItem,
        editInputsSection(data) {
            this.flagEdit = true
            this.setEditData(data)
            this.booleanUniquePaymentHistoryUser()
            this.booleanUniquePaymentHistoryItem()
            this.v$.$validate()
        },
        cancellationEdit() {
            this.flagEdit = false
            this.v$.$reset()
            this.clearData()
        },
        checkValidateEditInputs(state) {
            this.v$.$validate()
            if (!this.v$.$error) {
                let data = this.setValidData(state)
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
                            if (this.$store.getters.getUrlParam === null) {
                                this.$store.dispatch('getAllData')
                            } else {
                                this.$store.dispatch('getAllSection')
                            }
                            this.$store.commit('updateModalRequest', {data: 'success', text: 'Успешное изменение!'})
                            this.cancellationEdit()
                        }
                    }).catch((error) => {
                    this.$store.commit('updateModalRequest', {data: 'error', text: 'Ошибка изменения!'})
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                })
            }
        },
        pushOnRoutePaymentHistoryUser(id) {
            this.$router.push( '/payments-history/user/' + id)
        },
        textAreaAdjust(element) {
            element.style.height = "1px";
            element.style.height = (25+element.scrollHeight)+"px";
        }
    },
    async mounted() {
        this.$store.commit('updateUrl', this.$route.path.substring(0, this.$route.path.length - this.$route.params['id'].length - 1))
        this.$store.commit('updateUrlParam', this.$route.params['id'])

        /** Для Users **/
        if (this.$route.path === '/users/'+this.$route.params['id']) {
            await this.getAllRoles()
        }
        /** ********* **/

        await this.getAllSection(this.$route.params['id'])
    }
}
