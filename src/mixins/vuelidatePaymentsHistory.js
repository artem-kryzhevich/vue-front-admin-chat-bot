import {computed, reactive} from 'vue'
import {helpers, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
})
export const state = reactive({
    "item_id": null,
    "user_id": null,
    "expiration_date": null,
})
export const rules = computed(() => {
    return {
        item_id: {
            required: helpers.withMessage(customMessages.required, required),
        },
        user_id: {
            required: helpers.withMessage(customMessages.required, required),
        },
        expiration_date: {
            required: helpers.withMessage(customMessages.required, required),
        },
    }
})
