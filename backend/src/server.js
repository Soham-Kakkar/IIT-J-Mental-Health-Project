import express from "express";

import cors from "cors";

// import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";


// dotenv.config()


const app = express();

app.use(cors())


app.use(express.json())

app.use(userRoutes)



app.use(express.static("uploads"))

const start = async () => {
    

    co  nst connectDb = await mongoose.connect("mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


    app.listen(8023, () => {
        console.log(`Server Listening on port ${9090}`)
    })
}

start()