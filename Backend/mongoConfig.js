const mongoose = require("mongoose");
// connection funciton
mongoose.connect("mongodb://localhost:27017/Anime_character");
//  Schema
const infoSchema = new mongoose.Schema({
  name: String,
  url: String,
  image: String,
},{ collection: 'Informations' });
const Anime = new mongoose.model("Informations", infoSchema);
module.exports = Anime
