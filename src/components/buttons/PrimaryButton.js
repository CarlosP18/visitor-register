import React from 'react';

export const PrimaryButton = ({ onClick, classname, text, disabled }) => {
    return (
        <button
            className={`bg-green-400 h-12  w-full mt-5 rounded-md outline-none font-bold
            text-white ${classname} ${
                !disabled
                    ? 'hover:bg-green-600 transition-all duration-200 cursor-pointer'
                    : 'cursor-default'
            }`}
            onClick={onClick}
            type='submit'
            disabled={disabled}
        >
            {text}
        </button>
    );
};
