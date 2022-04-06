class User {
    constructor(name, email, password) {
        this._name = name;
        this._email = email;
        this._password = password;
    }

    static fromJson(json) {
        return new User(json.name, json.email, json.password);
    }

    toJson() {
        return {
            name: this._name,
            email: this._email,
            password: this._password,
        };
    }

    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    set name(value) {
        this._name = value;
    }
    set email(value) {
        this._email = value;
    }
    set password(value) {
        this._password = value;
    }
}

export default User;
