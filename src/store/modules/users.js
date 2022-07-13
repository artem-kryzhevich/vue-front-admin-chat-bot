export default {
    state: {
        sidebarVisible: '',
        sidebarUnfoldable: false,
        users: [],
        usersCount: 0
    },
    actions: {
        async getAllUsers(ctx, num = 1) {
            //const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=2');
            //const users = await res.json();

            const users1 = {
                users: [
                        {
                            "id": 1,
                            "first_name": "Иван",
                            "second_name": "Фамилия",
                            "tg_id": 1234567890,
                            "role_id": null
                        },
                        {
                            "id": 2,
                            "first_name": "Пётр",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 213,
                            "first_name": "Авокадо",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 15,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 125,
                            "first_name": "Иван",
                            "second_name": "Фамилия",
                            "tg_id": 1234567890,
                            "role_id": null
                        },
                        {
                            "id": 522,
                            "first_name": "Пётр",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 1226,
                            "first_name": "Алексей",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 1615,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 121255,
                            "first_name": "Иван",
                            "second_name": "Фамилия",
                            "tg_id": 1234567890,
                            "role_id": null
                        },
                        {
                            "id": 5522,
                            "first_name": "Пётр",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 152226,
                            "first_name": "Алексей",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        },
                        {
                            "id": 16515,
                            "first_name": "Василий",
                            "second_name": "Фамилия",
                            "tg_id": 9876543210,
                            "role_id": 1
                        }
                    ],
                leng: 103,

            }
            const users2 = {
                users: [
                    {
                        "id": 512,
                        "first_name": "AAAAAAA",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 152,
                        "first_name": "FFFFFFFFFF",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 167,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 15,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 125,
                        "first_name": "Иван",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 522,
                        "first_name": "Пётр",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 1226,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 1615,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 121255,
                        "first_name": "Иван",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 5522,
                        "first_name": "Пётр",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 152226,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    }
                ],
                leng: 103,

            }
            const users3 = {
                users: [
                    {
                        "id": 511352,
                        "first_name": "AAAAAAA",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 152,
                        "first_name": "FFFFFFFFFF",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 167,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 15,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 125,
                        "first_name": "Иван",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 522,
                        "first_name": "Пётр",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 1226,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 1615,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 121255,
                        "first_name": "Иван",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 5522,
                        "first_name": "Пётр",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 152226,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    }
                ],
                leng: 103,

            }
            const users4 = {
                users: [
                    {
                        "id": 35,
                        "first_name": "AAAAAAA",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 152,
                        "first_name": "FFFFFFFFFF",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 167,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 15,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 125,
                        "first_name": "Иван",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 522,
                        "first_name": "Пётр",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 1226,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 1615,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 121255,
                        "first_name": "Иван",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 5522,
                        "first_name": "Пётр",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 152226,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    }
                ],
                leng: 103,

            }
            const users5 = {
                users: [
                    {
                        "id": 5512,
                        "first_name": "AAAAAAA",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 152,
                        "first_name": "FFFFFFFFFF",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 167,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 15,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 125,
                        "first_name": "Иван",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 522,
                        "first_name": "Пётр",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 1226,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 1615,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 121255,
                        "first_name": "Иван",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 5522,
                        "first_name": "Пётр",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 152226,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 16515,
                        "first_name": "Василий",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    }
                ],
                leng: 103,

            }
            const users6 = {
                users: [
                    {
                        "id": 512,
                        "first_name": "AAAAAAA",
                        "second_name": "Фамилия",
                        "tg_id": 1234567890,
                        "role_id": null
                    },
                    {
                        "id": 152,
                        "first_name": "FFFFFFFFFF",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    },
                    {
                        "id": 167,
                        "first_name": "Алексей",
                        "second_name": "Фамилия",
                        "tg_id": 9876543210,
                        "role_id": 1
                    }
                ],
                leng: 103,

            }

            if (num === 1) {
                ctx.commit('updateUsers', users1)
            }
            else if(num === 2) {
                ctx.commit('updateUsers', users2)
            }
            else if(num === 3) {
                ctx.commit('updateUsers', users3)
            }
            else if(num === 4) {
                ctx.commit('updateUsers', users4)
            }
            else if(num === 5) {
                ctx.commit('updateUsers', users5)
            }
            else {
                ctx.commit('updateUsers', users6)
            }
        },

        async deleteUser(ctx, data) {
           // console.log(data.user)
           // console.log(data.page)

           /* await axios.post('/users?page=pageNumber', {
                id: data.user.id
            }).then(function (response) {
                if(response.status === 200) {
                    //this.getAllUsers(data.page);
                }
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });*/

            ctx.commit('deleteUserMutation', data.user)

            if(data.page === 1 || data.page === 2 || data.page === 3) {
                Toast.fire({
                    icon: 'success',
                    title: 'Пользователь удалён'
                })
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: 'Ошибка удаления'
                })
            }
        }

    },
    getters: {
        allUsers(state) {
            return state.users
        },
        usersCount(state) {
            return state.usersCount
        }
    },
    mutations: {
        updateUsers(state, data) {
            state.users = data.users
            state.usersCount = data.leng
        },

        deleteUserMutation(state, user) {
            //для теста
            state.users.splice(state.users.findIndex(u => u.id === user.id), 1)
        }
    }

}
