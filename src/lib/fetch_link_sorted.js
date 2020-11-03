const { fetchLinkByUserId } = require('./fetch_link_by_userId')

// Fetch links created by a specific user sorted by date
module.exports.fetchSortedLinks = (userId, users, linkType) => {
    const linksArray = fetchLinkByUserId(userId, users, linkType);

    if(linksArray.length === 0) {
        throw new Error('The resource you are looking for does not exist')
    }
    // sort linksArray and prevent linksArray from being mutated in place;
    const linksArraySorted = linksArray.slice().sort((a, b) => b.dateCreated - a.dateCreated)

    return linksArraySorted;
};