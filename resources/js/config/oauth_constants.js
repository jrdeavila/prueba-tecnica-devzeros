class OauthConfig {
    static client_id = "2";
    static client_secret = "2N9jBVwSYWo28xMMopKqV8OeujGpYHCdqIozQDkc";
    static grant_type = "password";
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export default OauthConfig;
