import express from "express"
import cors from "cors"
import dataCon from "./database/dataCon.js";
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// routes
import sleepRoutes from "./routes/sleep.js"


// Routes
app.use('/api/sleep',sleepRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  dataCon()
});
