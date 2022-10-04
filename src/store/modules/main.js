import api from "@/services/api";
import EventBus from "@/common/EventBus";

export default {
    state: {
        data: [],
        current_page: 1,
        total_pages: 1,
        count: 0,
        total: 0,

        array_count_row: [10,25,50,100],
        count_row: 10,
        flagSorted: false,
        propertySorted: 'id',

        flag_query: false,
        query: '',

        url: null,
        backend_url: null,
        url_param: null
    },
    actions: {
        async getAllData(ctx) {
            if (!!process.env.VUE_APP_DEBUG) {
                let query
                if (ctx.state.query === null || ctx.state.query === '') {query = ''}
                else {query = '&q=' + ctx.state.query}

                await api.get(ctx.state.backend_url + '?page=' + ctx.state.current_page
                    + '&limit=' + ctx.state.count_row + '&filter_by=' + ctx.state.propertySorted
                    + '&desc=' + ctx.state.flagSorted
                    + query
                ).then( (response) => {
                    if (response.status === 200) {
                        //console.log(response.data);
                        ctx.commit('updateData', response.data)
                    }
                }).catch( (error) => {
                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                    console.log(error);
                });
            } else
                console.log(ctx)
        },
        async addData(ctx, data) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.put(ctx.state.backend_url + '/create', data).then( (response) => {
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
        async editingData(ctx, data) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.post(ctx.state.backend_url + '/' + data.id, data)
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
        async deleteData(ctx, id) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.delete(ctx.state.backend_url + '/' + id)
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
        getBackendUrl(state) {
            return state.backend_url
        },
        getUrlParam(state) {
            return state.url_param
        },
        getData(state) {
            return state.data
        },
        getCurrentPage(state) {
            return state.current_page
        },
        getCountRow(state) {
            return state.count_row
        },
        getArrayCountRow(state) {
            return state.array_count_row
        },
        getTotalPages(state) {
            return state.total_pages
        },
        getFlagSorted(state) {
            return state.flagSorted
        },
        getPropertySorted(state) {
            return state.propertySorted
        },

        getFlagQuery(state) {
            return state.flag_query
        },
        getQuery(state) {
            return state.query
        }
    },
    mutations: {
        updateUrl(state, name) {
            state.backend_url = process.env.VUE_APP_BACKEND_URL + name
            state.url = process.env.VUE_APP_BASE_URL + name
        },
        updateUrlParam(state, param) {
            state.url_param = param
        },
        updateData(state, data) {
            state.data = data.data
            state.current_page = data.current_page
            state.total_pages = data.total_pages
            state.count = data.count
            state.total = data.total
        },
        updateCurrentPage(state, value) {
            state.current_page = value
        },
        updateCountRow(state, value) {
            state.count_row = Number(value)
        },
        updateModalRequest(state, data) {
            Toast.fire({
                icon: data.data,
                title: data.text
            })
        },
        updatePropertySorted(state, data) {
            state.propertySorted = data
        },
        updateFlagSorted(state, data) {
            state.flagSorted = data
        },

        updateFlagQuery(state, data) {
            state.flag_query = data
        },
        updateQuery(state, data) {
            state.query = data
        }
    }
}
