import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
const TableBooks = React.lazy(() => import("./TableBooks"));

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
                <Suspense fallback={<Loading />}>
                  <TableBooks />
                </Suspense>
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


function Loading() {
  return (
    <div className="position-absolute top-50 start-50" >
      <div className="spinner-grow text-primary" role="status" style={{ width: "100px", height: "100px" }}>
      </div>
    </div>
  );
}


if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
