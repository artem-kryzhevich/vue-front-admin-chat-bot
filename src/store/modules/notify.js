import api from "@/services/api";
import EventBus from "@/common/EventBus";

export default {
    state: {
        notifies: [],
    },
    actions: {
        async getAllNotify(ctx) {
            if (!!process.env.VUE_APP_DEBUG) {
                await api.get(process.env.VUE_APP_BACKEND_URL + '/notify/get_notifies').then(response => {
                    if (response.status === 200) {
                        //console.log(response.data);
                        ctx.commit('updateNotify', response.data)
                    }
                }).catch(function (error) {
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                    console.log(error);
                });
            } else
                console.log(ctx)
        },
        async addDataNotify(ctx, data) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.put(process.env.VUE_APP_BACKEND_URL + '/notify/create_notify', data.data)
                    .then( (response) => {
                        if (response.status === 200) {
                            //console.log(response);
                            return Promise.resolve(response);
                        }
                }).catch( (error) => {
                    console.log(error);
                    return Promise.reject(error);
                });
            } else
                console.log(data)
        },
        async editingDataNotify(ctx, data) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.post(process.env.VUE_APP_BACKEND_URL + '/notify/edit_notify/' + data.id, data.data)
                    .then( (response) => {
                        if (response.status === 200) {
                            //console.log(response);
                            return Promise.resolve(response);
                        }
                    }).catch( (error) => {
                        console.log(error);
                        return Promise.reject(error);
                    });
            }
            else
                console.log(data)
        },
        async deleteDataNotify(ctx, id) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.delete(process.env.VUE_APP_BACKEND_URL + '/notify/delete_notify/' + id)
                    .then( (response) => {
                        if (response.status === 200) {
                            //console.log(response);
                            return Promise.resolve(response);
                        }
                    }).catch( (error) => {
                        console.log(error);
                        return Promise.reject(error);
                    });
            }
            else
                console.log(id)
        },
    },
    getters: {
        getNotify(state) {
            return state.notifies
        }
    },
    mutations: {
        updateNotify(state, data) {
            state.notifies = data.data
        },
    }
}
