import {app} from "./app.js"
import dotenv from "dotenv";
import {dbConnect} from "./db/db.connect.js";

// Environment Variable 
dotenv.config({path: "./.env"})

const port = process.env.PORT || 4000;


app.get("/me", (req, res) => {
    res.status(200).json({
        message: "This is an e-commerce app"
    });
});



//  Database Connection
dbConnect().then( () => {
    app.listen( () => {
        console.log(`App is listening om Port: ${port}`)
    })
}).catch( (error) =>{ 
       console.log(`Failed to connect to MongoDB ${error}`)
})
