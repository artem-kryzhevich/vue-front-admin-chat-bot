import api from "@/services/api";
import EventBus from "@/common/EventBus";
import router from "@/router";

export default {
    state: {
        dataSection: {},
    },
    actions: {
        async getAllSection(ctx) {
            if (!!process.env.VUE_APP_DEBUG) {
                await api.get(ctx.getters.getBackendUrl + '/' + ctx.getters.getUrlParam).then(response => {
                    if (response && response.data.status_code === 404) {
                        router.back()
                    }
                    if (response.status === 200) {
                        //console.log(response.data);
                        ctx.commit('updateSection', response.data)
                    }
                }).catch(function (error) {
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                    if (error.response && error.response.status === 422) {
                        router.back()
                    }
                    //console.log(error);
                });
            } //else
                //console.log(ctx)
        },
    },
    getters: {
        getSection(state) {
            return state.dataSection
        },
    },
    mutations: {
        updateSection(state, data) {
            state.dataSection = data
        },
    }
}
