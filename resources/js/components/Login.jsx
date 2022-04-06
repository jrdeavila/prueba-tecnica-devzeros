import React from "react";
import FormInput from "./FormInput";
import AuthController from "../controllers/auth_controller";
import User from "../models/user";

const authCtrl = new AuthController();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "test@mail.com",
            password: "test1234",
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.login = this.login.bind(this);
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    login() {
        let user = new User("", this.state.email, this.state.password);
        authCtrl.login(user).then((value) => {
            if (value === true) {
                location.reload();
            }
            if (value != null) {
                console.log(value);
            }
        });
    }

    render() {
        return (
            <div className="d-flex justify-content-center my-auto my-auto">
                <div
                    className="card position-relative pb-5"
                    style={{
                        marginTop: "10%",
                        width: "30rem",
                    }}
                >
                    <div className="position-fixed start-50 translate-middle">
                        <div
                            style={{
                                width: "100px",
                                height: "100px",
                            }}
                            className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                        >
                            <i
                                className="bi bi-person-fill"
                                style={{
                                    fontSize: "4rem",
                                }}
                            ></i>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="mt-5 text-center mb-4">
                            <h3>Member Login</h3>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <FormInput
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail}
                                    className="fs-2"
                                    label="Email"
                                    placeholder="example@mail.es"
                                    type="email"
                                />
                            </div>
                            <div className="col-md-12 mb-3">
                                <FormInput
                                    value={this.state.password}
                                    onChange={this.handleChangePassword}
                                    label="Password"
                                    placeholder="********"
                                    type="password"
                                />
                            </div>
                            <div className="col-md-12">
                                <button
                                    onClick={this.login}
                                    className="btn btn-primary w-100 fs-2"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
