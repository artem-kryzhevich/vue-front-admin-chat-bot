import {computed, reactive} from 'vue'
import {helpers, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
    telegram_id: 'Поле может содержать только цифры',
    isUnique: 'Администратор не найден!'
})
export const state = reactive({
    tg_id: null,
    isUnique: true
})

const isUnique = (value) => state.isUnique === true

let telegram_id = helpers.regex(/^[1-9]\d*$/)
export const rules = computed(() => {
    return {
        tg_id: {
            required: helpers.withMessage(customMessages.required, required),
            telegram_id: helpers.withMessage(customMessages.telegram_id, telegram_id),
            isUnique: helpers.withMessage(customMessages.isUnique, isUnique)
        }
    }
})
