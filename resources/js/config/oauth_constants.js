const constants = require('./oauth.json');

class OauthConfig {
    static client_id = constants['client_id'];
    static client_secret = constants['client_secret'];
    static grant_type = constants['grant_type'];
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export default OauthConfig;
