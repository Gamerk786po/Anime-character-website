//Importing
const express = require("express");
const cors = require("cors");
const Anime = require("./mongoConfig");

// setting an instance for express
const app = express();

// middleware
app.use(express.json()); // parser of json
app.use(cors());

// Testing route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// route for getting anime characters req
app.get("/getAnime", async (req, res) => {
  try {
    const characters = await Anime.find();
    res.status(200);
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Error getting data", error });
  }
});

// route for putting anime characters req
app.put("/putAnime", async (req, res) => {
  const { mal_id, name, url, image } = req.body;
  // Saving and updating data in db
  try {
    const updateCreateAnime = await Anime.findOneAndUpdate(
      { mal_id },
      { name, url, image },
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
// Route for deleting anime characters
app.delete("/delAnime", async (req, res) => {
  const { mal_id } = req.body;

  if (!mal_id) {
    return res.status(400).json({ message: "mal_id is required" });
  }

  try {
    const delCharacter = await Anime.findOneAndDelete({ mal_id });

    if (!delCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json({
      message: "The character is deleted",
      data: delCharacter,
    });
  } catch (error) {
    console.log("Error deleting character:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// listening port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
