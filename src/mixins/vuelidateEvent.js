import {computed, reactive} from 'vue'
import {helpers, maxLength, minLength, required} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
})

export const state = reactive({
    "title": null,
    "date": null,
    "description": null,
    "video_file_id": null,
    "buttons": [
        {
            "text": null,
            "url": null
        }
    ],
    "cities_meet": {
        "text": null,
        "buttons": [
            {
                "text": null,
                "url": null
            }
        ]
    }
})

export const rules = computed(() => {
    return {
        title: {
            required: helpers.withMessage(customMessages.required, required)
        },
        date: {
            required: helpers.withMessage(customMessages.required, required)
        },
        description: {
            required: helpers.withMessage(customMessages.required, required)
        },
        video_file_id: {
            required: helpers.withMessage(customMessages.required, required)
        },
        buttons: {
            $each: helpers.forEach({
                text: {
                    required: helpers.withMessage(customMessages.required, required)
                },
                url: {
                    required: helpers.withMessage(customMessages.required, required),
                    maxLength: helpers.withMessage(({$params}) => `Поле не может быть больше ${$params.max} символов`, maxLength(2083)),
                    minLength: helpers.withMessage(({$params}) => `Поле не может быть меньше ${$params.max} символов`, minLength(1))
                }
            })
        },
        cities_meet: {
            text: {
                required: helpers.withMessage(customMessages.required, required)
            },
            buttons: {
                $each: helpers.forEach({
                    text: {
                        required: helpers.withMessage(customMessages.required, required)
                    },
                    url: {
                        required: helpers.withMessage(customMessages.required, required),
                        maxLength: helpers.withMessage(({$params}) => `Поле не может быть больше ${$params.max} символов`, maxLength(2083)),
                        minLength: helpers.withMessage(({$params}) => `Поле не может быть меньше ${$params.max} символов`, minLength(1))
                    }
                })
            },
        }

    }
})
