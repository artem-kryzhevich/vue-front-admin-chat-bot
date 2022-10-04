import {computed, reactive} from 'vue'
import {helpers, numeric, maxLength, minValue, required, requiredIf} from '@vuelidate/validators'

const customMessages = reactive({
    required: 'Поле обязательно для заполнения',
    numeric: 'Поле должно быть числом',
    minValue: 'Нельзя указывать дату и время в прошедшем времени'
})

export const state = reactive({
    "run_time": null,
    "text": null,
    "videos": [{0: null}],
    "photos": [{0: null}],
    "users": [{0: null}],
    "role_id": null
})

export const rules = computed(() => {

    return {
        run_time: {
            required: helpers.withMessage(customMessages.required, required),
            minValue: helpers.withMessage(customMessages.minValue, minValue(new Date())),
        },
        text: {
            required: helpers.withMessage(customMessages.required, required),
            maxLength: helpers.withMessage(({$params}) => `Поле не может быть больше ${$params.max} символов`, maxLength(4096)),
        },
        videos: {
            $each: helpers.forEach({
                0: {
                    requiredIfFoo: helpers.withMessage(customMessages.required,
                        requiredIf(computed(() => {return state.videos.length > 1})))
                }
            })
        },
        photos: {
            $each: helpers.forEach({
                0: {
                    requiredIfFoo: helpers.withMessage(customMessages.required,
                        requiredIf(computed(() => {return state.photos.length > 1})))
                }
            })
        },
        users: {
            $each: helpers.forEach({
                0: {
                    numeric: helpers.withMessage(customMessages.numeric, numeric),
                    requiredIfFoo: helpers.withMessage(customMessages.required,
                        requiredIf(computed(() => {return state.users.length > 1}))),
                }
            })
        },
        role_id: {
            numeric: helpers.withMessage(customMessages.numeric, numeric),
        }
    }
})
