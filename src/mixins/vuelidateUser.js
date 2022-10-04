import {computed, reactive} from 'vue'
import {helpers, maxLength, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
    email: 'Значение не является действительным адресом электронной почты',
    telegram_id: 'Поле может содержать только цифры',
    role_id: 'Выберите роль из списка',
})
export const state = reactive({
    first_name: null,
    second_name: null,
    phone_number: null,
    tg_id: null,
    role_id: null,
})
let telegram_id = helpers.regex(/^[1-9]\d*$/)
let role_id = helpers.regex(/^(-1|null|\d*)$/)
export const rules = computed(() => {
    return {
        first_name: {
            required: helpers.withMessage(customMessages.required, required)
        },
        second_name: {},
        phone_number: {
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(25))
        },
        tg_id: {
            required: helpers.withMessage(customMessages.required, required),
            telegram_id: helpers.withMessage(customMessages.telegram_id, telegram_id)
        },
        role_id: {
            numeric: helpers.withMessage(customMessages.role_id, role_id),
            required: helpers.withMessage(customMessages.required, required)
        }
    }
})
