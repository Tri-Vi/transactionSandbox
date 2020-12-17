const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new tutorial
exports.create = async (req,res) => {
  // Validate request
  if(!req.body.title){
    res.stsatus(400).send({
      message: "Content cannot be empty!"
    })
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }
  
  try {
    let result = await db.sequelize.transaction(async(t) => {
      await Tutorial.create(tutorial, {transaction: t});
    });
    console.log('hit result');
    console.log(result);
    res.send(result);
  } catch (err){
    // Rollback trnsaction only if the transaction object is defined
    console.log(err);
    res.status(500).send({
      message: err.message || "SOme error occurred while create the Tutorial"
    })
  }
  

  
  // Save Tutorial in the database
  // Tutorial.create(tutorial)
  //   .then(data => {
  //     res.send(data);
  //   }).catch(err => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while create athe Tutorial"
  //     })
  //   })
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({
    where: condition
  }).then(data =>{
    res.send(data);
  }).catch(err =>{
    res.status(500).send({
      message: err.message ||  "Some error occurred while retrieving tutorals"
    })
  })
};

// Find a single Tutorial with an id
exports.findOne = (req, res)=> {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    }).catch(err=>{
      res.status(500).send({
        message: "Error retrieving Tutorial with id="+id
      })
    })
};

// Update a Tutorial by the id in the request
exports.update = (req,res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: {
      id: id
    }
  }).then(num => {
    if(num==1){
      res.send({
        message: "Tutorial was updated susccessfully."
      })
    } else {
      res.send({
        message: `Cannot update tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty! `
      })
    }
  }).catch(err =>{
    res.status(500).send({
      message: "Error udpdating Tutorial with id=" + id
    })
  })
};

// Delete a tutorial with the specified id in the request
exports.delete = (req,res) => {
  const id = req.parms.id;
  Tutorial.destroy({
    where: {id: id}
  }).then(num => {
    if(num==1){
      res.send({
        message: "Tutorial was deleted succesffully!"
      })
    } else {
      res.send({
        message: `Cannot delete Tutorial with id${id}. Maybe Tutorial was not found`
      })
    }
  }).catch(err =>{
    res.status(500).send({
      message: "Could not delete TUtorial with id=" + id
    })
  })
};

// Delete all Tutorials from the database
exports.deleteAll = (req,res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  }).then(nums=>{
    res.send({
      message: `${num} Tutorials were deleted succesfully!`
    });
  }).catch(err=>{
    res.status(500).send({
      message: err.message || "Some error occured while removing all tutorials"
    })
  })
};

// Find all published Tutorials
exports.findAllPublished = (req,res) => {
  Tutorial.findAll({
    where: {
      published: true
    }
  }).then(data =>{
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tuorials"
    })
  })
}
