import React from "react";

function FormInput(props) {
    return (
        <>
            <div className="form-floating">
                <input
                    type={props.type}
                    value={props.value ?? props.placeholder}
                    onChange={props.onChange}
                    className={
                        "form-control fs-5 text-primary" +
                        (props.errorMessage ? " is-invalid" : "")
                    }
                    placeholder={props.placeholder ?? props.label}
                    id={props.id}
                />
                <label className="fs-5 text-primary" htmlFor={props.id}>
                    {props.label}
                </label>
            </div>
            {props.errorMessage ? (
                <div
                    id={props.id + "Feedback"}
                    className="invalid-feedback d-block"
                >
                    {props.errorMessage ?? "This field is required"}
                </div>
            ) : null}
        </>
    );
}

export default FormInput;
