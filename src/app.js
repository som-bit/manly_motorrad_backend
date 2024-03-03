import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


// this is a middleware wherever we use the "USE" keyword from express
// it should be trated as a middleware
//CORS CROSS - ORIGIN ACCESS is a package that is used for security purpose 
// to define from what sources we will accept request, what sord of headers will we accept 
app.use(cors({

    origin: process.env.CORS_ORIGIN,
    credentials: true,

}))

// this middleware is for limiting the size of json
app.use(express.json({ limit: "16kb" }))

//this middleware is used to make the backend understand all sorts of url
app.use(express.urlencoded({ extended: true, limit: "16KB" }))

//this middleware is used to save static assets in public folder or our server
app.use(express.static("public"))

//to perform basic crud with cookies eg saving secure cookies in user browser
app.use(cookieParser())
export { app }