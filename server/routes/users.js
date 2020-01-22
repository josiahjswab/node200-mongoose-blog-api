const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  User
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).send(err));
})

router.get('/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then(users => {
      if(users === null) {
        res.status(404).send('NOT FOUND')
      } else {
        res.status(200).json(users);
      }
    })
    .catch(err => res.status(500).send(err));
})

router.post('/', (req, res) => {
  const { firstName, lastName, email, social } = req.body
  User
    .create({
      firstName,
      lastName,
      email,
      social
    })
    .then(users => {
      res.status(201).json(users)
    })
    .catch(err => res.status(500).send(err));
})

router.put('/:id', (req, res) => {
  console.log(req.params.id)
  User
    .findOneAndUpdate({_id: req.params.id}, {$set: {firstName: 'Mary'}})
    .then(users => {
      res.status(204).json(users)
    })
    .catch(err => res.status(500).send(err));
})


// example postman request -- http://localhost:8080/api/users/5e278516cb1e60f2d3441b10
router.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove({_id: req.params.id})
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.status(404).send(err));
})

module.exports = router;
