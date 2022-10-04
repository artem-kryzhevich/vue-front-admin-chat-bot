import api from "@/services/api";

export default {
    state: {
        statistics_menu: [],
        statistics_unique_users: [],
        statistics_ended_subs: [],
        statistics_renewed_subs: [],
        statistics_purchases: [],
        statistics_purchases_from_funnel: [],
        statistics_user_id: [],
        selectedUserId: null
    },
    actions: {
        async getAllStatistics(ctx, url) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.get(process.env.VUE_APP_BACKEND_URL + url)
                    .then((response) => {
                        if (response.status === 200) {
                            //console.log(response);
                            return Promise.resolve(response);
                        }
                    }).catch((error) => {
                        console.log(error);
                        return Promise.reject(error);
                    });
            } else
                console.log(ctx)
        }
    },
    getters: {
        getStatisticsMenu(state) {
            return state.statistics_menu
        },
        getStatisticsUniqueUsers(state) {
            return state.statistics_unique_users
        },
        getStatisticsEndedSubs(state) {
            return state.statistics_ended_subs
        },
        getStatisticsRenewedSubs(state) {
            return state.statistics_renewed_subs
        },
        getStatisticsPurchases(state) {
            return state.statistics_purchases
        },
        getStatisticsPurchasesFromFunnel(state) {
            return state.statistics_purchases_from_funnel
        },
        getStatisticsUserId(state) {
            return state.statistics_user_id
        },
        getSelectedUserId(state) {
            return state.selectedUserId
        }
    },
    mutations: {
        updateStatisticsMenu(state, data) {
            state.statistics_menu = data
        },
        updateStatisticsUniqueUsers(state, data) {
            state.statistics_unique_users = data
        },
        updateStatisticsEndedSubs(state, data) {
            state.statistics_ended_subs = data
        },
        updateStatisticsRenewedSubs(state, data) {
            state.statistics_renewed_subs = data
        },
        updateStatisticsPurchases(state, data) {
            state.statistics_purchases = data
        },
        updateStatisticsPurchasesFromFunnel(state, data) {
            state.statistics_purchases_from_funnel = data
        },
        updateStatisticsUserId(state, data) {
            state.statistics_user_id = data
        },
        updateSelectedUserId(state, data) {
            state.selectedUserId = data
        },
    }
}
