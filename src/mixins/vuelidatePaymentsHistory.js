import {computed, reactive} from 'vue'
import {helpers, numeric, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
    numeric: 'Поле должно быть числом',
    isUniqueItem: 'Товар не найден',
    isUniqueUser: 'Пользователь не найден'
})
export const state = reactive({
    "item_id": null,
    "user_id": null,
    "expiration_date": null,
    isUniqueItem: true,
    isUniqueUser: true
})

const isUniqueItem = (value) => state.isUniqueItem === true
const isUniqueUser = (value) => state.isUniqueUser === true

export const rules = computed(() => {
    return {
        item_id: {
            required: helpers.withMessage(customMessages.required, required),
            numeric: helpers.withMessage(customMessages.numeric, numeric),
            isUniqueItem: helpers.withMessage(customMessages.isUniqueItem, isUniqueItem)
        },
        user_id: {
            required: helpers.withMessage(customMessages.required, required),
            numeric: helpers.withMessage(customMessages.numeric, numeric),
            isUniqueUser: helpers.withMessage(customMessages.isUniqueUser, isUniqueUser)
        },
        expiration_date: {
            required: helpers.withMessage(customMessages.required, required),
        },
    }
})
