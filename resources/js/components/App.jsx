import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import TableBooks from "./TableBooks";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: true,
        };
    }

    componentDidMount() {
        if (localStorage.getItem("token")) {
            this.setState({ isLogged: true });
        } else {
            this.setState({ isLogged: false });
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            this.state.isLogged ? (
                                <TableBooks />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    ></Route>
                    <Route
                        path="/login"
                        element={
                            !this.state.isLogged ? (
                                <Login />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
