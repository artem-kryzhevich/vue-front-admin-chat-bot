import {computed, reactive} from 'vue'
import {helpers, maxLength, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
    boolean: 'Выберите is_visible'
})
export const state = reactive({
    "title": null,
    "slug": null,
    "emoji": null,
    "description": null,
    "form": null,
    "is_visible": null
})
export const rules = computed(() => {
    return {
        title: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(100))
        },
        slug: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(100))
        },
        emoji: {
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(30))
        },
        description: {
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(4096))
        },
        form: {
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(100))
        },
        is_visible: {
            boolean: helpers.withMessage(customMessages.boolean, value => value === true || value === false),
        }
    }
})
