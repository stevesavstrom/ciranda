import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import SearchItem from '../SearchItem/SearchItem';

function SearchList () {

const companies = useSelector(store => store.userSearch);

if (companies.length === 0) {
    return(
        <section>
            <h1>Adjust your filters to find recycling companies</h1>
        </section>
    )
} else {
    return (
        <section>
            <ul>
                {companies.map(company => {
                    return (
                        <SearchItem key={company.id} company={company} />
                    )
                })}
            </ul>
        </section>
    )
}
}

export default SearchList;