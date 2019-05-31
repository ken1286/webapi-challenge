const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel.js');


// CRUD



//middleware
function validateActionId(req, res, next) {
  const { id } = req.params;

  actionDb.get(id)
    .then( action => {
      if(action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: "Action not found: Invalid ID." })
      }
    })
    .catch( err => {
      res.status(500).json({ message: 'Failed to process request.'})
    })
};

function validateAction(req, res, next) {
  const { notes } = req.body;
  const { description } = req.body;
  if(!notes || !description) {
    res.status(400).json({ message: 'Missing required field(s). Please include notes and description.' });
  } else {
    next();
  }
};

module.exports = router;