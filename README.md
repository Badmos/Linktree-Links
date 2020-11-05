# Linktree-Links
Create and fetch multiple types of linktree links

## How To Run
There are two ways to run this code. The code has been deployed and hosted as a glitch service. You can use the link hosted on glitch by using this base URL ```https://flint-intriguing-koi.glitch.me``` (Sleepy instance, goes to sleep after a long period of inactivity so first calls after long periods of inactivity might take 15 to 20 seconds) or install locally. Follow the steps below to install locally.
- Ensure to have Node.js installed
- Clone this repository
- Navigate to the root directory
- Run  ```npm install``` to install dependencies
- Run: ```node index.js```
- Go to an HTTP client and use ```http://localhost:9000/``` as the base URL.


## Endpoints and associated Payload
- Create new link: ```http://localhost:9000/links?type=:linkType``` Possible linkType values include: "classic", "shows", or "music"
  - Endpoint: ```/links?type=:linkType```
  - HTTP Method to create any link type ==> POST
  - Payload for a "classic" link and expected data type: {
    "link": "www.linktr.ee" ==> String
    "title": "Sample Classic Link", ==> String, must not be longer than 144 characters
    "email": "test@linktr.ee", ==> String, must be a valid email
   }
  - Payload for a "shows" link and expected data type: {
    "link": "www.linktr.ee" ==> String
    "title": "Sample Sold Out Shows link", ==> String, must not be longer than 144 characters
    "email": "test@linktr.ee", ==> String, must be a valid email
    "isSoldOut": true, ==> Boolean
    "isNotOnSale": false ==> Boolean
   }
  - Payload for a "music" link: {
    "link": "www.linktr.ee" ==> String
    "email": "test@linktr.ee", ==> String, must be a valid email
    "platform": "Spotify" ===> String. Possible platform values are "Spotify", "Apple", "Music", "Soundcloud", "YouTube Music", "Deezer", "Tidal", "Bandcamp"   
   }
- Fetch link by userId: ```http://localhost:9000/link/:userId?type=:linkType``` Possible linkType values include: "classic", "shows", or "music". userId can be gotten from the response body of a newly created link
  - Endpoint: ```/link/:userId?type=:linkType```
  - HTTP Method: GET
  - Endpoint gets all links created by any particular userId
  
- Fetch link by userId sorted by date created: ```http://127.0.0.1:9000/sorted_links/:userId?type=:linkType``` Possible linkType values include: "classic", "shows", or "music". userId can be gotten from the response body of a newly created link.
  - Endpoint: ```/sorted_links/:userId?type=:linkType```
  - HTTP Method: GET
  - Endpoint gets all links created by any particular userId sorted by date created. Most recent links appear first
  
## Extras
- Fetch all users created and their associated data: ```http://127.0.0.1:9000/users```
  Endpoint: ```/users```
  - HTTP method: GET
  - Endpoint returns users schema
  Users Schema is documented below
  ```JSON
  [
        {
            "email": "String",
            "userId": "String",
            "links": [
                {
                    "title": "String",
                    "link": "String",
                    "dateCreated": "Integer",
                    "linkId": "String",
                    "linkType": "String"
                }
            ]
        }
    ]
  ```

## Roadmap/Todos
- Implement a link type for payments and donations. Charity organizations and other organizations would be able to aggregate a payments for a particular cause and prepopulate with the amount and donation reason.
- Plug into payment link infrastructure of payment/fintech companies.
- Ensure user cannot create more than one link for a platform for music-style links.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
