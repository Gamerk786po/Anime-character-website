//Importing
const express = require("express");
const Anime = require("./mongoConfig");

// setting an instance for express
const app = express();

// middleware
app.use(express.json()); // parser of json

// Testing route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// route for put req
app.put("/putAnime", async (req, res) => {
  const { mal_id, name, url, image } = req.body;
  // Saving and updating data in db
  try {
    const updateCreateAnime = await Anime.findOneAndUpdate(
      { mal_id },
      {name, url, image },
      { new: true, upsert: true }
    );

    // Send response back
    res.status(200).json({
      message: "Anime saved/updated successfully",
      data: updateCreateAnime,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
});
// route for get req
app.get("/getAnime", async (req, res) => {
  try{
    const characters = await Anime.find();
    res.status(200)
    res.json(characters)
  }catch(error){
    res.status(500).json({message: "Error getting data", error})
  }
})

// listening port
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
