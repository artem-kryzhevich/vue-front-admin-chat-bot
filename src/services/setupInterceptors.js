import axiosInstance from "./api";
import TokenService from "./token.service";
import EventBus from "@/common/EventBus";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (originalConfig.url !== "/signin" && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    console.log(err)
                    if (err.response && err.response.status === 401
                        && err.response.data.detail === "Refresh token expired"
                        && err.response.request.responseURL === process.env.VUE_APP_BACKEND_URL+"/refresh_token") {
                        EventBus.dispatch("logout");
                    }
                    try {
                        const rs = await axiosInstance.post("/refresh_token", {
                            refresh_token: TokenService.getLocalRefreshToken()
                        });
                        const { token } = rs.data;
                        store.dispatch('auth/refreshToken', token);
                        TokenService.updateLocalAccessToken(token);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};
export default setup;
