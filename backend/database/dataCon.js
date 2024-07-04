import mongoose from "mongoose";

const dataCon=async()=>{
    try {
        // MongoDB connection
        mongoose.connect(
          "mongodb+srv://mincherry14:kXBmqGIxsCjH5bf1@cluster0.gyzcebc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );
    
        console.log("database connected")
    
        // kXBmqGIxsCjH5bf1 mincherry14
      } catch (error) {
        console.log(error)
      }
   
    };
    


    export default dataCon