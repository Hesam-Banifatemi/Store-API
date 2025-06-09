

const errorHandlerMiddleware = async(err, req, res, next) => {
    return res.status(500).json({msg: "some thing went wrong!!!"});
};

module.exports = errorHandlerMiddleware;