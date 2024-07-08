import React from 'react';
import PropTypes from 'prop-types';

function CleanCodeButton({ onClick, loading }) {
    return (
        <button
            onClick={onClick}
            className='mt-3 p-2 text-lg font-semibold cursor-pointer disabled:cursor-not-allowed rounded-lg bg-blue-600 dark:bg-[#FF9900] text-white hover:bg-blue-700 dark:hover:bg-emerald-500 disabled:bg-blue-300 dark:disabled:bg-emerald-300'
            disabled={loading}
        >
            {loading ? 'Cleaning...' : 'Clean code'}
        </button>
    );
}

CleanCodeButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

export default CleanCodeButton;