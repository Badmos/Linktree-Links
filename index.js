const express = require('express');
const { json } = require('body-parser');

const { createLinkRouter } = require('./src/routes/create_link');
const { fetchLinkRouter } = require('./src/routes/fetch_link');
const { fetchSortedLinksRouter } = require('./src/routes/fetch_link_sorted');
const { fetchUsersRouter } = require('./src/routes/fetch_users')
const { errorHandler } = require('./src/middlewares/error_handler');


const app = express();

app.use(json())
app.use('/links', createLinkRouter);
app.use('/link', fetchLinkRouter);
app.use('/sorted_links', fetchSortedLinksRouter);
app.use('/users', fetchUsersRouter)

app.use(errorHandler);


const PORT = process.env.PORT || '9000'

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});