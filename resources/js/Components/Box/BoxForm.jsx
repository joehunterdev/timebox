import React, { useState } from "react";
const BoxForm = ({
    item,
    nextFreePlaceholders,
    handleSubmit,
    handleChange,
}) => {

    const [textAreaValue, setTextAreaValue] = useState(item.text);
    const [isValid, setIsValid] = useState(true);
     return (
        <form
            onSubmit={handleSubmit}
            className="form-control form-inline body-bg opacity-75 h-100 border-0"
            style={{ height: "100%" }}
        >
            <div className="row">
                <div className="col-12 d-flex align-items-start ">
                    <input
                        type="datetime-local"
                        name="start"
                        className="d-none"
                        value={item.start}
                        readOnly
                    />

                    <select
                        name="duration"
                        className="form-select rounded-0 border-0 bg-transparent"
                        defaultValue={item.duration}
                        onChange={handleChange}
                        required
                    >
                        <option value="30">30mins</option>
                        <option value="60" disabled={nextFreePlaceholders < 1}>
                            60mins
                        </option>
                        <option value="90" disabled={nextFreePlaceholders < 2}>
                            1.5 Hrs
                        </option>
                        <option value="120" disabled={nextFreePlaceholders < 3}>
                            2 Hrs
                        </option>
                        <option value="180" disabled={nextFreePlaceholders < 4}>
                            3 Hrs
                        </option>
                        <option value="240" disabled={nextFreePlaceholders < 5}>
                            4 Hrs
                        </option>
                    </select>
                    <select
                        name="status"
                        defaultValue={item.status}
                        onChange={handleChange}
                        required
                        className="form-select rounded-0 border-0 bg-transparent"
                    >
                        <option value="todo">todo</option>
                        <option value="done">done</option>
                    </select>
                    <button className="border-0 bg-transparent" type="submit">
                        <i className="fas fa-tick"></i>
                    </button>

                    {item.status !== "free" ? (
                        <button
                            disabled={!isValid}
                            className="border-0 bg-transparent"
                            type="submit"
                        >
                            <i className="fas fa-check"></i>
                        </button>
                    ) : (
                        <button
                            className="border-0 bg-transparent"
                            type="submit"
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    )}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <textarea
                        className={`form-control shadow-sm p-1 border-light rounded-0 p-2 w-100 h-100 textarea-full-width ${
                            isValid ? "is-valid" : "is-invalid"
                        }`}
                        type="text"
                        name="text"
                        defaultValue={item.text}
                        maxLength="400"
                        pattern="[A-Za-z0-9\s.,!?]*"
                        title="Only alphanumeric characters, spaces, and basic punctuation are allowed."
                        required
                        onChange={(e) => {
                            const pattern = /^[A-Za-z0-9\s.,!?]*$/;
                            const newValue = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                            );
                            if (!pattern.test(newValue)) {
                                setIsValid(false);
                            } else {
                                setIsValid(true);
                                setTextAreaValue(newValue);
                            }
                        }}
                    />
                </div>
            </div>
        </form>
    );
};

export default BoxForm;
