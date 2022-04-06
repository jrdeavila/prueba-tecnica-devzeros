class OauthConfig {
    static client_id = "2";
    static client_secret = "hFV5LTLMC2jD8g63LAKKX2tIMCnwF6ChPyVU8kfL";
    static grant_type = "password";
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export default OauthConfig;
