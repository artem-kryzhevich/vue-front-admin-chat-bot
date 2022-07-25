import {header} from "@/store/modules/headerTest";

export default {
    state: {
        data: [],
        current_page: 1,
        total_pages: 1,
        count: 0,
        total: 0,

        array_count_row: [10,25,50,100],
        count_row: 10,
        url: null
    },
    actions: {
        async getAllData(ctx) {
            if (!!process.env.VUE_APP_DEBUG) {
                await this.axios.get(ctx.state.url + '?page=' + ctx.state.current_page + '&limit=' + ctx.state.count_row,
                    {headers: header}).then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        ctx.commit('updateData', response.data)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else
                console.log(ctx)
        },
        async addData(ctx, data) {
            if (!!process.env.VUE_APP_DEBUG) {
                await this.axios.put(ctx.state.url + '/create', data, {headers: header}).then(function (response) {
                    if (response.status === 200) {
                        ctx.dispatch('getAllData')
                        ctx.commit('updateModalRequest', {data: 'success', text: 'Успешное добавление!'})
                    }
                    console.log(response);
                }).catch(function (error) {
                    ctx.commit('updateModalRequest', {data: 'error', text: 'Ошибка добавления!'})
                    console.log(error);
                });
            } else
                console.log(data)
        },
        async editingData(ctx, data) {
            if (!!process.env.VUE_APP_DEBUG) {
                await this.axios.post(ctx.state.url + '/' + data.id, data, {headers: header})
                    .then(function (response) {
                        if (response.status === 200) {
                            ctx.dispatch('getAllData')
                            ctx.commit('updateModalRequest', {data: 'success', text: 'Успешное изменение!'})
                        }
                        console.log(response);
                    }).catch(function (error) {
                        ctx.commit('updateModalRequest', {data: 'error', text: 'Ошибка изменения!'})
                        console.log(error);
                    });
            }
            else
                console.log(data)
        },
        async deleteData(ctx, id) {
            if (!!process.env.VUE_APP_DEBUG) {
                await this.axios.delete(ctx.state.url + '/' + id, {headers: header})
                    .then(function (response) {
                        if (response.status === 200) {
                            ctx.dispatch('getAllData')
                            ctx.commit('updateModalRequest', {data: 'success', text: 'Успешное удаление!'})
                        }
                        console.log(response);
                    }).catch(function (error) {
                        ctx.commit('updateModalRequest', {data: 'error', text: 'Ошибка удаления!'})
                        console.log(error);
                    });
            }
            else
                console.log(id)
        },
    },
    getters: {
        getUrl(state) {
            return state.url
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
        }
    },
    mutations: {
        updateUrl(state, name) {
            state.url = process.env.VUE_APP_BACKEND_URL + name
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
        }
    }
}
