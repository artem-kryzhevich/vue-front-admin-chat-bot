import MyCustomFaker from "@/store/modules/MyCustomFaker";

export default {
    state: {
        sidebarVisible: '',
        sidebarUnfoldable: false,

        users: [],
        current_page: 1,
        total_pages: 1,
        count_users: 10,
        total_users: 0
    },
    actions: {
        async getAllUsers(ctx, page = ctx.state.current_page) {
            /*await axios.post('/users?page=' + page + '&limit=' + this.countUsers).then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    ctx.commit('updateUsers', response.data)
                }
            }).catch(function (error) {
                console.log(error);
            });*/
            ctx.commit('updateUsers', MyCustomFaker.getUsers(page, ctx.state.count_users))
        },

        async deleteUser(ctx, user) {
            /*await axios.post('/delete-user, {id: user.id}).then(function (response) {
                 if(response.status === 200) {
                     this.dispatch('getAllUsers')
                 }
                 console.log(response);
             }).catch(function (error) {
                 console.log(error);
             });*/

            if (ctx.state.current_page === 1 || ctx.state.current_page === 2 || ctx.state.current_page === 3) {
                ctx.commit('deleteUserMutation', user)
                Toast.fire({
                    icon: 'success',
                    title: 'Пользователь удалён'
                })
                this.dispatch('getAllUsers')
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Ошибка удаления'
                })
            }
        },

        async addUser(ctx, user) {
            /*await axios.post('/add-user', user).then(function (response) {
                 if(response.status === 200) {
                     this.dispatch('getAllUsers')
                 }
                 console.log(response);
             }).catch(function (error) {
                 console.log(error);
             });*/

            console.log(user)
            Toast.fire({
                icon: 'success',
                title: 'Пользователь добавлен'
            })
            this.dispatch('getAllUsers')
        },

        async editingUser(ctx, user) {
            /*await axios.post('/update-user', user).then(function (response) {
                 if(response.status === 200) {
                     this.dispatch('getAllUsers')
                 }
                 console.log(response);
             }).catch(function (error) {
                 console.log(error);
             });*/

            console.log(user)
            Toast.fire({
                icon: 'success',
                title: 'Пользователь изменён'
            })
            this.dispatch('getAllUsers')
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
            state.count_users = data.count_users
            state.total_users = data.total_users
        },

        deleteUserMutation(state, user) {
            //для теста (delete)
            state.users.splice(state.users.findIndex(u => u.id === user.id), 1)
        }
    },
    modules: {
        MyCustomFaker
    }

}
