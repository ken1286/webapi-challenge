const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel.js');

// CRUD

router.get('/', (req, res) => {

  actionDb.get()
    .then(actions => {
      res.status(200).json({ actions });
    })
    .catch( err => {
      res.status(500).json({ error: "Action information could not be retrieved."})
    })
});

router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
  const updatedAction = req.body;
  const { id } = req.params;

  actionDb.update(id, updatedAction)
    .then( action => {
      res.status(204).json({action});
    })
    .catch( err => {
      res.status(500).json({ message: 'Error updating action.' });
    })
});

router.delete('/:id', validateActionId, (req, res) => {
  const { id } = req.params;

  actionDb.remove(id)
    .then( action => {
      res.status(204).json({ action })
    })
    .catch( err => {
      res.status(500).json({ message: 'error' });
    })
});

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