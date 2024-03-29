import {mapActions, mapGetters, mapMutations} from "vuex";
import {
    booleanUniquePaymentHistoryItem,
    booleanUniquePaymentHistoryUser,
    checkValidateModal,
    clearData,
    feedbackInvalidInput,
    methodDelete,
    openAddModal,
    openEditModal,
    setEditData,
    validateInput,
    validOrInvalidInput,
} from "@/mixins/methodsCRUD";
import router from "@/router";

export default {
    data() {
        return {
            flagModal: true,
            modalOpen: false,
            modalSearchOpen: false
        }
    },
    computed: {
        ...mapGetters(['getData', 'getTotalPages', 'getArrayCountRow', 'getCountRow',
            'getCurrentPage', 'getFlagSorted', 'getPropertySorted', 'getFlagQuery', 'getQuery']),
        modalTitle() { return this.flagModal ? 'Добавление' : 'Редактирование' },
        modalButton() { return this.flagModal ? 'Добавить' : 'Изменить' },
        countData: {
            get() { return String(this.getCountRow) },
            set(value) { this.$store.commit('updateCountRow', value); this.$store.dispatch('getAllData') }
        },
        current_page: {
            get() { return this.getCurrentPage },
            set(value) { this.$store.commit('updateCurrentPage', value) }
        },
        getKeysData() {
            if (this.getData.length > 0) {
                return Object.keys(this.getData[0]).filter( (f) => {
                    return f !== 'created_at'
                        && f !== 'deleted_at'
                        && f !== 'updated_at'
                        && f !== 'item_title'
                        && f !== 'user_title'
                })
            }
        }
    },
    methods: {
        ...mapActions(['getAllData', 'addData', 'editingData', 'deleteData', 'getAllRoles']),
        ...mapMutations(['updateCountRow', 'updateCurrentPage', 'updateUrl',
            'updateUrlParam', 'updateFlagSorted', 'updateFlagSorted', 'updateFlagQuery', 'updateQuery']),
        async clickCallback(page) {
            this.$store.commit('updateCurrentPage', page)
            await this.getAllData()
        },
        modalOpenSwitch() {
            return this.modalOpen = !this.modalOpen
        },
        closeModal() {
            this.modalOpenSwitch()
            this.v$.$reset()
            this.clearData()
        },
        passingASortingParameter(param) {
            this.$store.commit('updatePropertySorted', param);
            this.$store.commit('updateFlagSorted', !this.getFlagSorted);
            this.$store.dispatch('getAllData')
        },
        openAddModal,
        openEditModal,
        methodDelete,
        checkValidateModal,
        setEditData,
        validOrInvalidInput,
        feedbackInvalidInput,
        validateInput,
        clearData,
        pushOnRouteId(id) {
            let path = this.$route.path.replace(/(\/*$)/, "")
            if (this.$route.path.replace(this.$route.params.id, '').replace(/(\/*$)/, "") === '/payments-history/user') {
                path = this.$route.path.replace(this.$route.params.id, '').replace(/(\/*$)/, "").replace('/user', '')
            }
            this.$router.push( path + '/'+ id)
        },
        updateUrlPaymentsHistoryUser() {
            if (router.currentRoute.value.path.replace(/^([^\/]*\/[^\/]*\/).*$/, '$1')
                .replace(/(\/*$)/, "") === '/payments-history') {
                this.$store.commit('updateUrl', router.currentRoute.value.path.replace(/^([^\/]*\/[^\/]*\/).*$/, '$1')
                    .replace(/(\/*$)/, ""))
            }
        },
        booleanUniquePaymentHistoryUser,
        booleanUniquePaymentHistoryItem,
        openSearchModal() {
            return this.modalSearchOpen = !this.modalSearchOpen
        },
        closeSearchModal() {
            this.openSearchModal()
        },
        textAreaAdjust(element) {
            element.style.height = "1px";
            element.style.height = (25+element.scrollHeight)+"px";
        }
    },
    async mounted() {
        this.$store.commit('updateUrl', this.$route.path.replace(/(\/*$)/, ""))
        this.$store.commit('updateUrlParam', null)

        /** Для Users **/
        if (this.$route.path.replace(/(\/*$)/, "") === '/users') {
            await this.getAllRoles()
        }

        await this.getAllData()
    }
}
