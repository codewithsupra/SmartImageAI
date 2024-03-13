import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='f1 black text-base rank-message text-shadow'>
                {`${name}, your current rank is...`}
            </div>
            <div className='text-base rank-number text-shadow'>
                {entries}
            </div>
            <div className='text-base rank-message text-shadow'>
                {'Keep up the good work!'}
            </div>
        </div>
    );
}

export default Rank;
