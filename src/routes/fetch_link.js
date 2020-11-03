const express = require('express')
const router = express.Router();

const { fetchLinkByUserId } = require('../lib/fetch_link_by_userId');
const { userSchema } = require('../models/users')

const fetchLinksController = (req, res) => {
    let links;
    const { userId } = req.params
    const possibleLinkTypes = ['classic', 'shows', 'music']


    if(!req.query || !req.query.type) {
        throw new Error('Link type Not Provided. Link type can be either classic, shows or music')
    }

    const linkType = req.query.type.toLowerCase();

    if(!possibleLinkTypes.includes(linkType.toLowerCase())) {
        throw new Error('Link type must be either classic, shows or music')
    }

    try {
        links = fetchLinkByUserId(userId, userSchema, linkType);
    } catch (err) {
        return res.status(400).json({
            status: err.name,
            message: err.message,
            data: null
        })
    }

    if(links.length === 0) {
        return res.status(404).json({
            status: 'NotFoundError',
            message: 'The Resource you are looking for does not exist',
            data: links
        })
    }

    return res.status(200).json({
        status: 'success',
        message: 'links successfully fetched',
        data: links
    })
}

router.get('/:userId', fetchLinksController);

module.exports.fetchLinkRouter = router;