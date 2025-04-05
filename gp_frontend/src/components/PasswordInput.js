import React, { useState } from 'react';

function PasswordInput({ label, name, value, onChange, placeholder }) {
    const [show, setShow] = useState(false);

    return (
        <div className="mb-3">
            <label>{label}</label>
            <div className="input-group">
                <input
                    type={show ? 'text' : 'password'}
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShow(!show)}
                >
                    {show ? 'Hide' : 'Show'}
                </button>
            </div>
        </div>
    );
}

export default PasswordInput;