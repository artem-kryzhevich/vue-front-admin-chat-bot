import {header} from "@/store/modules/headerTest";

export default {
    state: {
        roles: [],
    },
    actions: {
        async getAllRoles(ctx) {
            if (!!process.env.VUE_APP_DEBUG) {
                await this.axios.get(process.env.VUE_APP_BACKEND_URL + '/roles?page=1&limit=100',{headers: header}).then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        ctx.commit('updateRoles', response.data)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else
                console.log(ctx)
        }
    },
    getters: {
        getRoles(state) {
            return state.roles
        }
    },
    mutations: {
        updateRoles(state, data) {
            let obj = {}
            data.data.forEach( (el) => obj[el.id] =  el.title );
            state.roles = obj
        },
    }
}
