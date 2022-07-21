import {computed, reactive} from 'vue'
import useVuelidate from '@vuelidate/core'
import {helpers, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
    email: 'Значение не является действительным адресом электронной почты',
    telegram_id: 'Поле может содержать только цифры',
    role_id: 'Выберите роль из списка'
})
export const state = reactive({
    first_name: '',
    second_name: '',
    tg_id: '',
    role_id: ''
})
let telegram_id = helpers.regex(/^[1-9]\d*$/)
let role_id = helpers.regex(/^(null|\d*)$/)
export const rules = computed(() => {
    return {
        first_name: {
            required: helpers.withMessage(customMessages.required, required)
        },
        second_name: {
            required: helpers.withMessage(customMessages.required, required)
        },
        tg_id: {
            required: helpers.withMessage(customMessages.required, required),
            telegram_id: helpers.withMessage(customMessages.telegram_id, telegram_id)
        },
        role_id: {
            numeric: helpers.withMessage(customMessages.role_id, role_id),
            required: helpers.withMessage(customMessages.required, required),
        }
    }
})

export const v$ = useVuelidate(rules, state)

export default {
    methods: {
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
    }
}
