import MyCustomFaker from "@/store/modules/MyCustomFaker";

const header = {
    "Authorization": "Bearer "+process.env.VUE_APP_BEARER_TOKEN,
    "accept": "application/json",
    "Content-Type": "application/json"
}

export default {
    state: {
        sidebarVisible: '',
        sidebarUnfoldable: false,

        users: [],
        current_page: 1,
        total_pages: 1,
        count_users: 10,
        total_users: 0,
        count_users_on_page: 0,
    },
    actions: {
        async getAllUsers(ctx, page = ctx.state.current_page) {
            if (!!process.env.VUE_APP_DEBUG) {
                await this.axios.get(process.env.VUE_APP_BACKEND_URL + '/users?page=' + page + '&limit=' + ctx.state.count_users,
                    {headers: header}).then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        ctx.commit('updateUsers', response.data)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else
                ctx.commit('updateUsers', MyCustomFaker.getUsers(page, ctx.state.count_users))
        },
        async addUser(ctx, user) {
            if (!!process.env.VUE_APP_DEBUG) {
                let data = {
                    "first_name": user.first_name,
                    "second_name": user.second_name,
                    "tg_id": user.tg_id,
                    "role_id": user.role_id
                }
                await this.axios.put(process.env.VUE_APP_BACKEND_URL + '/users', data, {headers: header}).then(function (response) {
                    if (response.status === 200) {
                        ctx.dispatch('getAllUsers')
                        ctx.commit('modalRequestUser', {data: 'success', text: 'Пользователь добавлен'})
                    }
                    console.log(response);
                }).catch(function (error) {
                    ctx.commit('modalRequestUser', {data: 'error', text: 'Ошибка добавления'})
                    console.log(error);
                });
            } else
                console.log(user)
        },

        async editingUser(ctx, user) {
            if (!!process.env.VUE_APP_DEBUG) {
                let data = {
                    "first_name": user.first_name,
                    "second_name": user.second_name,
                    "tg_id": user.tg_id,
                    "role_id": user.role_id
                }
                await this.axios.post(process.env.VUE_APP_BACKEND_URL + '/users/' + user.id, data, {headers: header})
                    .then(function (response) {
                        if (response.status === 200) {
                            ctx.dispatch('getAllUsers')
                            ctx.commit('modalRequestUser', {data: 'success', text: 'Пользователь изменён'})
                        }
                        console.log(response);
                    }).catch(function (error) {
                        ctx.commit('modalRequestUser', {data: 'error', text: 'Ошибка изменения'})
                        console.log(error);
                    });
            }
            else
                console.log(user)
        },
        async deleteUser(ctx, user) {
            if (!!process.env.VUE_APP_DEBUG) {
                await this.axios.delete(process.env.VUE_APP_BACKEND_URL + '/users/' + user.id, {headers: header})
                    .then(function (response) {
                        if (response.status === 200) {
                            ctx.dispatch('getAllUsers')
                            ctx.commit('modalRequestUser', {data: 'success', text: 'Пользователь удалён'})
                        }
                        console.log(response);
                    }).catch(function (error) {
                        ctx.commit('modalRequestUser', {data: 'error', text: 'Ошибка удаления'})
                        console.log(error);
                    });
            }
            else
                console.log(user)
        }

    },
    getters: {
        allUsers(state) {
            return state.users
        },
        totalPagesCount(state) {
            return state.total_pages
        }
    },
    mutations: {
        updateUsers(state, data) {
            state.users = data.data
            state.current_page = data.current_page
            state.total_pages = data.total_pages
            state.count_users_on_page = data.count
            state.total_users = data.total
        },
        modalRequestUser(state, data) {
            Toast.fire({
                icon: data.data,
                title: data.text
            })
        }
    },
    modules: {
        MyCustomFaker
    }

}
