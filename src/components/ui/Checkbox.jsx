import React from "react";

function Checkbox({ id, checked, onCheckedChange, className = "" }) {
    return (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onCheckedChange}
            className={`w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ${className}`}
        />
    );
}

export default Checkbox;
