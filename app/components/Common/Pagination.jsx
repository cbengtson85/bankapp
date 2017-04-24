import React from 'react';
import PropTypes from 'prop-types';


const Pagination = ({pageIndex, maxPages, handlePrev, handleNext}) => {
    const atBeginning = pageIndex === 1;
    const atEnd = pageIndex === maxPages;

    return (
        <div id="transactionPagination" className="pagination">
            <a href="#" onClick={handlePrev} className={atBeginning ? 'inactive' : ''}><img src="/img/left-filled.png" /></a>
            <span className="page-index">{pageIndex} of {maxPages}</span>
            <a href="#" onClick={handleNext} className={atEnd ? 'inactive' : ''}><img src="/img/right-filled.png" /></a>
        </div>
    )
};

if(process.env.NODE_ENV !== 'production') {
    Pagination.propTypes = {
        pageIndex : PropTypes.number,
        maxPages : PropTypes.number,
        handlePrev : PropTypes.func,
        handleNext : PropTypes.func
    };
}

export default Pagination;
