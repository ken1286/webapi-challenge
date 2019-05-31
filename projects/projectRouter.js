const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel.js');
const actionDb = require('../data/helpers/actionModel.js');

// CRUD



// middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;

  projectDb.get(id)
    .then( project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "Project not found: Invalid ID." })
      }
    })
    .catch( err => {
      res.status(500).json({ message: 'Failed to process request.'})
    })
};

function validateProject(req, res, next) {
  const { name } = req.body;
  const { description } = req.body;
  if(!name || !description) {
    res.status(400).json({ message: 'Missing required field(s). Please include name and description.' });
  } else {
    next();
  }
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