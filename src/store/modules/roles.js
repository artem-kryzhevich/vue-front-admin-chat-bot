import api from "@/services/api";
import EventBus from "@/common/EventBus";

export default {
    state: {
        roles: [],
    },
    actions: {
        async getAllRoles(ctx) {
            if (!!process.env.VUE_APP_DEBUG) {
                await api.get(process.env.VUE_APP_BACKEND_URL + '/roles?page=1&limit=100').then(response => {
                    if (response.status === 200) {
                        //console.log(response.data);
                        ctx.commit('updateRoles', response.data)
                    }
                }).catch(function (error) {
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                    //console.log(error);
                });
            } //else
                //console.log(ctx)
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
