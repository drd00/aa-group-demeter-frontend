import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

function ProfileField( { label, value, onModify, onUpdate } ) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleEdit = () => {
        setIsEditing(true);
        onModify(true);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        onUpdate(label, inputValue);
        setIsEditing(false);
        onModify(false);
    };

    return (
        <div
            className="flex justify-between items-center bg-white shadow-md rounded p-4 mb-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            onMouseEnter={() => onModify(true)}
            onMouseLeave={() => onModify(false)}
        >
            {isEditing ? (
                <input
                    autoFocus
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleSubmit}
                    className="bg-transparent border-none p-0 w-full focus:ring0"
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}  // submit on enter key
                />
            ) : (
                <span><b>{label}</b>: {value}</span>
            )}

            <button
                className="text-blue-500 hover:text-blue-700" 
                onClick={isEditing ? handleSubmit : handleEdit}
            >
                <FontAwesomeIcon icon={isEditing ? faCheck : faArrowRight} />
            </button>
        </div>
    );
}

ProfileField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onModify: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
};

export default ProfileField;