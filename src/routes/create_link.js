const express = require('express');
const validator = require('validator');
const { randomBytes } = require('crypto')

const { userSchema } = require('../models/users');
const { createLink } = require('../lib/create_new_link');

const router = express.Router();

let allUserEmails = [];
const createLinkController = (req, res) => {
    const { link, title, email, isSoldOut, isNotOnSale, platform} = req.body;
    const possibleLinkTypes = ['classic', 'shows', 'music']


    if(!req.query || !req.query.type) {
        throw new Error('Link type Not Provided. Link type can be either classic, shows or music')
    }

    if(!possibleLinkTypes.includes(req.query.type.toLowerCase())) {
        throw new Error('Link type must be either classic, shows or music')
    }
    
    let linkDetails;
    const linkType = req.query.type.toLowerCase();

    if(linkType === 'classic') {
        const data = { email, title, link, linkType, validator}
        try {
            linkDetails = createLink(data);
        } catch (err) {
            return res.status(400).json({
                status: err.name,
                message: err.message,
                data: null
            })
        }
    }

    if(linkType === "music") {
        const data = { email, platform, link, linkType, validator}
        try {
            linkDetails = createLink(data);
        } catch (err) {
            return res.status(400).json({
                status: err.name,
                message: err.message,
                data: null
            })
        }
    }

    if(linkType === "shows") {
        const data = { email, title, link, linkType, validator, isSoldOut, isNotOnSale}
        try {
            linkDetails = createLink(data);
        } catch (err) {
            return res.status(400).json({
                status: err.name,
                message: err.message,
                data: null
            })
        }
    }

    const linkId = randomBytes(4).toString('hex');
    const isExistingEmail = allUserEmails.includes(email.toLowerCase())

    if(isExistingEmail) {
        const foundUser = userSchema.find(user => {
            return user.email.toLowerCase() == email.toLowerCase();
        })

        if(linkType === 'classic') {
            foundUser.links.push({
                title: linkDetails.title,
                link: linkDetails.link, 
                dateCreated: linkDetails.dateCreated, 
                linkId, 
                linkType
            })

        } else if(linkType === 'shows') {
            foundUser.links.push({
                title: linkDetails.title,
                link: linkDetails.link, 
                isAvailable: linkDetails.isAvailable,
                isSoldOut: linkDetails.isSoldOut,
                isNotOnSale: linkDetails.isNotOnSale,
                dateCreated: linkDetails.dateCreated, 
                linkId, 
                linkType,
                
            })
        } else {
            foundUser.links.push({
                link: linkDetails.link, 
                dateCreated: linkDetails.dateCreated, 
                platform: linkDetails.platform,
                linkId, 
                linkType
            })
        }
    } else {
        if(linkType === 'classic') {
            allUserEmails.push(email.toLowerCase());
            userId = randomBytes(4).toString('hex');
            userSchema.push({email, userId, links: [{
                    title: linkDetails.title,
                    link: linkDetails.link,
                    dateCreated: linkDetails.dateCreated, 
                    linkId, 
                    linkType
                }] 
            });
        }
        
        if(linkType === 'shows') {
            allUserEmails.push(email.toLowerCase());
            userId = randomBytes(4).toString('hex');
            userSchema.push({email, userId, links: [{
                    title: linkDetails.title,
                    link: linkDetails.link,
                    isAvailable: linkDetails.isAvailable,
                    isSoldOut: linkDetails.isSoldOut,
                    isNotOnSale: linkDetails.isNotOnSale,
                    dateCreated: linkDetails.dateCreated, 
                    linkId, 
                    linkType
                }] 
            });
        }

        if(linkType === 'music') {
            allUserEmails.push(email.toLowerCase());
            userId = randomBytes(4).toString('hex');
            userSchema.push({email, userId, links: [{
                    link: linkDetails.link,
                    dateCreated: linkDetails.dateCreated,
                    platform: linkDetails.platform, 
                    linkId, 
                    linkType
                }] 
            });
        }
    }

    return res.status(201).json({
        status: 'success',
        message: `${linkType} link successfully created`,
        data: {...linkDetails, userId}
    })
}

router.post('/', createLinkController);

module.exports.createLinkRouter = router;