import api from "@/services/api";

export default {
    actions: {
        async importUsers(ctx, data) {
            if (!!process.env.VUE_APP_DEBUG) {
                return await api.post(process.env.VUE_APP_BACKEND_URL + '/users/import', data).then((response) => {
                    if (response.status === 200) {
                        //console.log(response);
                        return Promise.resolve(response);
                    }
                }).catch((error) => {
                    //console.log(error);
                    return Promise.reject(error);
                });
            } //else
                //console.log(ctx)
        }
    }
}
