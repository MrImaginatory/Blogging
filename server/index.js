import app from "./app.js";
import connectDB from "./database/db.js";

const ServerPort = process.env.PORT;

connectDB()
    .then(()=>{
        app.listen(ServerPort,()=>{
            console.log(`Server up and running at: http://localhost:${ServerPort}`);
        })
    })
    .catch((error)=>{
        console.error('Error in indexJs:',error);
    })