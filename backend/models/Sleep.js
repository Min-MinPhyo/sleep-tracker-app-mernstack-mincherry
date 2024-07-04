import mongoose from "mongoose";
const sleepSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
});



const Sleep=mongoose.model("Sleep",sleepSchema)
export default Sleep