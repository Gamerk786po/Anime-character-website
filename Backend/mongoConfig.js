const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// connection funciton
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
//  Schema
const infoSchema = new mongoose.Schema(
  {
    mal_id: Number,
    name: String,
    url: String,
    image: String,
  },
  { collection: "favCharacters" }
);
const Anime = new mongoose.model("favCharacters", infoSchema);
module.exports = Anime;
