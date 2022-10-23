import api from "@/services/api";
import EventBus from "@/common/EventBus";

export default {
    state: {
        botInfo: [],
    },
    actions: {
        async getAllBotInfo(ctx) {
            if (!!process.env.VUE_APP_DEBUG) {
                await api.get(process.env.VUE_APP_BACKEND_URL + '/bot/info').then(response => {
                    if (response.status === 200) {
                        //console.log(response.data);
                        ctx.commit('updateBotInfo', response.data)
                    }
                }).catch(error => {
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                    //console.log(error);
                });
            } //else
                //console.log(ctx)
        },
        async editingBotInfo(ctx, data) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.post(process.env.VUE_APP_BACKEND_URL +  '/bot/info', data)
                    .then( (response) => {
                        if (response.status === 200) {
                            //console.log(response);
                            return Promise.resolve(response);
                        }
                    }).catch( (error) => {
                        //console.log(error);
                        return Promise.reject(error);
                    });
            }
            //else
                //console.log(data)
        },
    },
    getters: {
        getBotInfo(state) {
            return state.botInfo
        }
    },
    mutations: {
        updateBotInfo(state, data) {
            state.botInfo = data
        },
    }
}
