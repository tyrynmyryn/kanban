import React from 'react';
import './Input.scss';

interface Props {
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: boolean;
}

const Input: React.FC<Props> = ({error, type = "text", value, onChange, placeholder = ''}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input ${error ? 'input_error' : null}`}
        />
    );
};

export default Input;