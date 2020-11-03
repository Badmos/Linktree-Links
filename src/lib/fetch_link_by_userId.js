//Fetch links created by a specific user
module.exports.fetchLinkByUserId = (userId, users, linkType) => {
    const linksData = users.filter(user =>  {
        return user.userId === userId.toLowerCase();
    })

    if(!linksData[0]) {
        throw new Error('The resource you are looking for does not exist')
    }

    const linksDataArray = linksData[0].links;

    const links = []

    for(const linkData of linksDataArray) {
        if(linkData.linkType === linkType) {
            links.push(linkData)
        }
    }

    return links;

} 