//create new link
module.exports.createLink = (data) => {
    if(data.linkType === 'classic' || data.linkType === 'shows') {
        if(data.email === undefined || data.title === undefined || data.link === undefined) {
            throw new Error ('email, title, link are required parameters')
        }

        if(!typeof data.title === 'string' && data.title.length <= 144) {
            throw new Error ('Title cannot be longer that 144 characters')
        }
    }
    

    const isValidUrl = data.validator.isURL(data.link)
    const isValidEmail = data.validator.isEmail(data.email)
    
    if(!isValidEmail) {
        throw new Error('email must be valid')
    }

    if(!isValidUrl) {
        throw new Error('Link must be a valid URL')
    }

    const dateCreated = Date.now();

    if(data.linkType === 'classic') {
        return {
            link: data.link, title: data.title, dateCreated
        };
    } else if(data.linkType === 'music') {
        if(data.platform === undefined) {
            throw new Error('platform is a required parameter')
        }

        const supportedPlatforms = ['Spotify', 'Apple Music', 'Soundcloud', 'YouTube Music',
                                        'Deezer', 'Tidal', 'Bandcamp'
                                    ];
        const isSupportedPlatform = supportedPlatforms.includes(data.platform);

        if(!isSupportedPlatform) {
            throw new Error(`platform must be one of ${supportedPlatforms.join(', ')}`)
        }

        /* TODO: Ensure that once a userId has already created a link for a platform
            they are unable to create another link for same platform
        */

        return {
            email: data.email, link: data.link, dateCreated, platform: data.platform
        }
       
    } else if(data.linkType === 'shows') {
        if(data.isSoldOut === undefined || data.isNotOnSale ===  undefined) {
            throw new Error('Parameters isSoldOut and isNotOnSale are required')
        }

        if((typeof data.isSoldOut !== 'boolean') || (typeof data.isNotOnSale !== 'boolean')) {
            throw new Error('Parameters isSoldOut and isNotOnSale must be a boolean')
        }

        if(data.isSoldOut && data.isNotOnSale) {
            throw new Error('Parameters isSoldOut and isNotOnSale can not both be true')
        }

        if(data.isSoldOut || data.isNotOnSale) {
            return {
                link: data.link,
                title: data.title,
                isAvailable: false,
                isSoldOut: data.isSoldOut,
                isNotOnSale: data.isNotOnSale,
                dateCreated
            }
        }
        
            return {
                    link: data.link,
                    title: data.title,
                    dateCreated,
                    isAvailable: true,
                    isSoldOut: data.isSoldOut,
                    isNotOnSale: data.isNotOnSale
            }
        
    } else {
        throw new Error('Link type Not Provided. Link type can be either classic, shows or music');
    }
}
