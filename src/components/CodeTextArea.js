import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';

function CodeTextArea({ value, onChange, placeholder, readOnly, onClear, onFileUpload }) {
    const [buttonText, setButtonText] = useState(
        <span><FontAwesomeIcon icon={faCopy} /> Copy</span>
    );
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(value);
        setButtonText(
            <span><FontAwesomeIcon icon={faCheck} /> Copied !</span>
        );
        setIsButtonDisabled(true);
        setTimeout(() => {
            setButtonText(
                <span><FontAwesomeIcon icon={faCopy} /> Copy</span>
            );
            setIsButtonDisabled(false);
        }, 1000);
    }

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([value], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'cleaned_code.py';
        document.body.appendChild(element);
        element.click()
    }

    return (
        <div className='relative w-full'>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                spellCheck={false}
                className='w-full h-[392px] text-sm placeholder:text-blue-700 dark:placeholder:text-[#E2B714] resize-none p-2.5 border-2 border-[#385ECA] rounded-lg focus:outline-none whitespace-pre overflow-auto shadow-sm dark:bg-[#323437] dark:text-gray-300 dark:border-[#E2B714]'
            />
            {readOnly ? (
                <div className='absolute bottom-5 right-[18px] space-x-5'>
                    <button
                        className='text-base font-medium text-blue-700 dark:text-[#E2B714] cursor-pointer opacity-80 hover:opacity-100'
                        onClick={handleDownload}
                        aria-label='Download cleaned code'
                    >
                        <FontAwesomeIcon icon={faDownload} /> Download
                    </button>
                    <button
                        className='text-base font-medium text-blue-700 dark:text-[#E2B714] cursor-pointer opacity-80 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50'
                        onClick={handleCopyCode}
                        disabled={isButtonDisabled}
                        aria-label='Copy cleaned code'
                    >
                        {buttonText}
                    </button>
                </div>
            ) : (
                <div className='absolute bottom-5 right-[18px] space-x-5'>
                    <label htmlFor='file-upload' className='text-base font-medium text-blue-700 dark:text-[#E2B714] cursor-pointer opacity-80 hover:opacity-100'>
                        <FontAwesomeIcon icon={faUpload} /> Upload
                    </label>
                    <input
                        id='file-upload'
                        type='file'
                        accept='.py'
                        onChange={onFileUpload}
                        className='hidden'
                    />
                    <button
                        className='text-base font-medium text-blue-700 dark:text-[#E2B714] cursor-pointer opacity-80 hover:opacity-100'
                        onClick={onClear}
                        aria-label='Clear code'
                    >
                        <FontAwesomeIcon icon={faTrashCan} /> Clear
                    </button>
                </div>
            )}
        </div>
    );
}

CodeTextArea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    readOnly: PropTypes.bool.isRequired,
    onClear: PropTypes.func,
    onFileUpload: PropTypes.func
}

export default CodeTextArea;