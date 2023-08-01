function searchQueryConverter(searchData) {
    let searchFilter;
    try {
        searchFilter = JSON.parse(searchData);
    } catch (error) {
        throw new Error('Invalid Search object');
    }
    let filter = {};
    let filterArray = [];
    for (const key in searchFilter) {
        if (searchFilter.hasOwnProperty(key)) {
            const value = searchFilter[key];

            filterArray.push({
                [key]: { $regex: new RegExp(`.*${value}.*`, 'i') },
            });
        }
    }
    filter = { ...filter, $or: filterArray };

    return filter;
}

module.exports = {
    searchQueryConverter,
};
