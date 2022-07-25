import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    data() {
        return {
            flagModal: true,
            modalOpen: false,
            flagSorted: true,
            propertySorted: 'id',
        }
    },
    computed: {
        ...mapGetters(['getTotalPages', 'getArrayCountRow', 'getCountRow', 'getCurrentPage']),
        modalTitle() { return this.flagModal ? 'Добавление' : 'Редактирование' },
        modalButton() { return this.flagModal ? 'Добавить' : 'Изменить' },
        countData: {
            get() { return String(this.getCountRow) },
            set(value) { this.$store.commit('updateCountRow', value); this.$store.dispatch('getAllData') }
        },
        current_page: {
            get() { return this.getCurrentPage },
            set(value) { this.$store.commit('updateCurrentPage', value) }
        }
    },
    methods: {
        ...mapActions(['getAllData', 'addData', 'editingData', 'deleteData', 'getAllRoles']),
        ...mapMutations(['updateCountRow', 'updateCurrentPage', 'updateUrl']),
        async clickCallback(page) {
            this.$store.commit('updateCurrentPage', page)
            await this.getAllData()
        },
        methodDelete(id) {
            Swal.fire({
                title: 'Вы уверены?',
                text: "Вы не сможете отменить это!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Да, удалить!',
                cancelButtonText: 'Отменить',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteData(id)
                }
            })
        },
        modalOpenSwitch() {
            return this.modalOpen = !this.modalOpen
        },
        clearData() {
            Object.keys(this.state).forEach(v => this.state[v] = null)
            if (!this.flagModal)
                delete this.state['id'];
        },
        closeModal() {
            this.modalOpenSwitch()
            this.v$.$reset()
            this.clearData()
        },
        passingASortingParameter(param) {
            this.propertySorted = param;
            this.flagSorted = !this.flagSorted
        },
        openAddModal() {
            this.modalOpenSwitch()
            this.flagModal = true

            /** Для Roles **/
            if(this.$route.path === '/roles') {
                this.state.is_visible = true
                this.v$.is_visible.$validate()
            }
            /** ********* **/

            /** Для Items **/
            if(this.$route.path === '/items') {
                this.state.can_buy_muliple_times = true
                this.v$.can_buy_muliple_times.$validate()
            }
            /** ********* **/
        },
        openEditModal(data) {
            this.setEditData(data)
            this.modalOpenSwitch()
            this.flagModal = false
            this.v$.$validate()
        },
        checkValidateModal(state) {
            this.v$.$validate()
            if (!this.v$.$error) {
                let data = this.setValidData(state)
                if (this.flagModal) { this.addData(data) }
                else { this.editingData(data) }
                this.modalOpenSwitch()
                this.v$.$reset()
                this.clearData()
            }
        },

        validOrInvalidInput(name, select) {
            if (select)
                return !!(!this.v$[name].$invalid && this.v$[name].$dirty)
            else
                return !!(this.v$[name].$invalid && this.v$[name].$dirty)
        },
        feedbackInvalidInput(name) {
            return this.v$[name].$error ? this.v$[name].$errors[0].$message : null
        },
        validateInput(name) {
            this.v$[name].$touch()
        }
    },
    async mounted() {
        this.$store.commit('updateUrl', this.$route.path)

        /** Для Users **/
        if (this.$route.path === '/users') {
            await this.getAllRoles()
        }
        /** ********* **/

        await this.getAllData()
    }
}
