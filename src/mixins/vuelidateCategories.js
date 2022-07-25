import {computed, reactive} from 'vue'
import {helpers, maxLength, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения'
})

export const state = reactive({
    "title": null,
    "slug": null,
    "channel_tg_id": null,
    "channel_url": null,
    "emoji": null,
    "private_channel_tg_id": null
})

export const rules = computed(() => {
    return {
        title: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(100))
        },
        slug: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(15))
        },
        channel_tg_id: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(20))
        },
        channel_url: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(100))
        },
        emoji: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(25))
        },
        private_channel_tg_id: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(20))
        },
    }
})
