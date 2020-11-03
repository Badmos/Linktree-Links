// Handle all incoming errors using thesame response schema
module.exports.errorHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            status: err.name,
            message: err.message,
            data: null
        })
    }
    console.error(err);
    res.status(400).send({
        message: 'something went wrong. Check the logs for more info',
    });
};