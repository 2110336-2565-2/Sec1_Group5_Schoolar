const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => res.send("Hello Schoolar"));

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`start server in port ${port}`))