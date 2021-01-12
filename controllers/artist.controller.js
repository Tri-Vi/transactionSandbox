const db = require("../models");
const Artist = db.artist;
const Album = db.album;
const Op = db.Sequelize.Op;
const sequelize = require('sequelize');
const embed = require('sequelize-embed')(db.sequelize);
const { mkInclude } = embed.util.helpers;
const { v4: uuidv4 } = require('uuid');

// Create and Save a new artist
exports.create = async (req,res) => {
  // Validate request
  if(!req.body.name){
    res.status(400).send({
      message: "Content cannot be empty!"
    })
  }

  let includeArtistAndAlbums =[
    mkInclude(Artist.Albums)
  ] 

  // Create a Tutorial
  const artist = {
    name: req.body.name,
    albums: req.body.albums,
  }
  
  
  /*  Managed Transaction */
  try {
    let result = await db.sequelize.transaction(async(transaction)=>{
      let tmpArtist = await embed.insert(Artist, artist, includeArtistAndAlbums, transaction);
      return tmpArtist;
    })
    res.status(200).send(result.dataValues);
  } catch(err){
    res.status(500).send({
      message: err.message || "Some error occurred while create an Artist"
    })
  }

  /* Unmanaged transactions */

  // const t = await db.sequelize.transaction();
  // try {
  //   const tmpArtist = await embed.insert(Artist, artist, includeArtistAndAlbums, t)
  //   await t.commit();
  //   res.status(200).send({
  //     message: 'Success'
  //   })
  // } catch(err){
  //     console.log(err);
  //     await t.rollback();
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while create an Artist"
  //     })
  // }

  /* No Transaction */
  // embed.insert(Artist, artist, includeArtistAndAlbums)
  //   .then(data=>{
  //     res.send(data)
  //   }).catch(err=>{
  //     console.log(err);
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while create an Artist"
  //     })
  //   })
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Artist.findAll({
    where: condition
  }).then(data =>{
    res.send(data);
  }).catch(err =>{
    res.status(500).send({
      message: err.message ||  "Some error occurred while retrieving artist"
    })
  })
};

// Find a single artist with an id
exports.findOne = (req, res)=> {
  const id = req.params.id;

  Artist.findByPk(id)
    .then(data => {
      res.send(data);
    }).catch(err=>{
      res.status(500).send({
        message: "Error retrieving artist with id="+id
      })
    })
};

// Update an artist by the id in the request
exports.update = (req,res) => {
  const id = req.params.id;

  Artist.update(req.body, {
    where: {
      id: id
    }
  }).then(num => {
    if(num==1){
      res.send({
        message: "Artist was updated susccessfully."
      })
    } else {
      res.send({
        message: `Cannot update artist with id=${id}. Maybe Artist was not found or req.body is empty! `
      })
    }
  }).catch(err =>{
    res.status(500).send({
      message: "Error udpdating Artist with id=" + id
    })
  })
};

// Delete an artist with the specified id in the request
exports.delete = (req,res) => {
  const id = req.parms.id;
  Artist.destroy({
    where: {id: id}
  }).then(num => {
    if(num==1){
      res.send({
        message: "Artist was deleted succesffully!"
      })
    } else {
      res.send({
        message: `Cannot delete Artist with id${id}. Maybe Artist was not found`
      })
    }
  }).catch(err =>{
    res.status(500).send({
      message: "Could not delete Artist with id=" + id
    })
  })
};

// Delete all Artists from the database
exports.deleteAll = (req,res) => {
  Artist.destroy({
    where: {},
    truncate: false
  }).then(nums=>{
    res.send({
      message: `${num} Artists were deleted succesfully!`
    });
  }).catch(err=>{
    res.status(500).send({
      message: err.message || "Some error occured while removing all artists"
    })
  })
};

