import axios from "axios";
import User from "../models/user";
import OauthConfig from "../config/oauth_constants";

class AuthController {
    async login(user) {
        let dataReq = {
            client_id: OauthConfig.client_id,
            client_secret: OauthConfig.client_secret,
            grant_type: OauthConfig.grant_type,
            username: user.email,
            password: user.password,
        };
        try {
            let res = await axios.post("/oauth/token", dataReq);
            let data = res.data;
            let status = res.status;
            if (status === 200) {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("expires_in", data.expires_in);
                return true;
            }
        } catch (e) {
            if (e.response.status === 400) {
                return e.response.data;
            }
            if (e.response.status === 401) {
                alert(e.response.data.error_description);
                return;
            }
        }
    }
    async signin(user) {}

    async logout() {
        localStorage.clear();
    }
}

export default AuthController;
