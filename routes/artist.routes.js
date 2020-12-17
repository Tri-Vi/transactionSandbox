module.exports = app => {
  const artist = require("../controllers/artist.controller.js");

  var router = require("express").Router();

  // Create a new artist
  router.post("/", artist.create);

  // Retrieve an artist
  router.get("/", artist.findAll);

  // Retrieve a single artist with id
  router.get("/:id", artist.findOne);

  // Delete an artist with id
  router.delete("/:id", artist.delete);

  // Delete all artists
  router.delete("/", artist.deleteAll);

  app.use('/api/artist', router);
}
