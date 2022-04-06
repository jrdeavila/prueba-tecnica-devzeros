import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import TableBooks from "./TableBooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Example() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<TableBooks />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
