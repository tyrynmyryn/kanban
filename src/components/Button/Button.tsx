import React from 'react';
import './Button.scss';

interface Props {
    children: string;
    onClick: () => void;
    className?: string;
}

const Button:React.FC<Props> = ({children, className = '', onClick}) => {
    return (
        <button
            onClick={onClick}
            className={`button ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;