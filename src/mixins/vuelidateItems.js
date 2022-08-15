import {computed, reactive} from 'vue'
import {helpers, integer, maxLength, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
    boolean: 'Выберите can_buy_muliple_times',
    integer: 'Поле должно быть числом'
})
export const state = reactive({
    "title": null,
    "slug": null,
    "price": null,
    "description": null,
    "duration": null,
    "can_buy_muliple_times": null
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
        price: {
            required: helpers.withMessage(customMessages.required, required),
            integer: helpers.withMessage(customMessages.integer, integer),
        },
        description: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({ $params }) => `Поле не может быть больше ${$params.max} символов`, maxLength(1024))
        },
        duration: {
            required: helpers.withMessage(customMessages.required, required),
            integer: helpers.withMessage(customMessages.integer, integer)
        },
        can_buy_muliple_times: {
            boolean: helpers.withMessage(customMessages.boolean, value => value === true || value === false),
        }
    }
})
