import api from "@/services/api";
import TokenService from "@/services/token.service";

class AuthService {
    login(id) {
        return api
            .post(process.env.VUE_APP_BACKEND_URL + '/signin', { tg_id: id })
            .then(response => {
                if (response.data.token) {
                    TokenService.setUser(response.data);
                }
                return response.data;
            });
    }
    logout() {
        TokenService.removeUser();
    }
}
export default new AuthService();
