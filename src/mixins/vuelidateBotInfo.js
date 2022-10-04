import {computed, reactive} from 'vue'
import {helpers, maxLength, minLength, required, requiredIf} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
})
export const state = reactive({
    "start": {
        "text": null,
        "tutorial_video": null
    },
    "missions": {
        "text": null,
        "buttons": [
            {
                "text": null,
                "url": null
            }
        ]
    },
    "statuses": {
        "text": null
    },
    "thematic_channels": {
        "text": null,
        "goals_text": null
    },
    "invalid_access": {
        "text": null
    }
})

export const rules = computed(() => {
    return {
        start: {
            text: {
                required: helpers.withMessage(customMessages.required, required),
                maxLength: helpers.withMessage(({$params}) => `Поле не может быть больше ${$params.max} символов`, maxLength(1024))
            },
            tutorial_video: {
                required: helpers.withMessage(customMessages.required, required)
            }
        },
        missions: {
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
            }
        },
        statuses: {
            text: {
                required: helpers.withMessage(customMessages.required, required),
                maxLength: helpers.withMessage(({$params}) => `Поле не может быть больше ${$params.max} символов`, maxLength(4096))
            }
        },
        thematic_channels: {
            text: {
                required: helpers.withMessage(customMessages.required, required),
                maxLength: helpers.withMessage(({$params}) => `Поле не может быть больше ${$params.max} символов`, maxLength(4096))
            },
            goals_text: {
                required: helpers.withMessage(customMessages.required, required),
                maxLength: helpers.withMessage(({$params}) => `Поле не может быть больше ${$params.max} символов`, maxLength(4096))
            }
        },
        invalid_access: {
            text: {
                required: helpers.withMessage(customMessages.required, required),
                maxLength: helpers.withMessage(({$params}) => `Поле не может быть больше ${$params.max} символов`, maxLength(4096))
            }
        }
    }
})
