// a wrapper to handle try catch or promises
// primarily used for communicating to database

const asyncHandler = () => {

    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
            catch((err) => next(err))
    }
}
export { asyncHandler }






























// const asyncHandler = ()=>{}
//higher order function
// const asyncHandler = (fn) => async (req, res, next) => {

//     try { }
//     catch (error) {


//         res.status(err.code || 500).json({

//             success: false,
//             message: err.message
//         })
//     }
// }