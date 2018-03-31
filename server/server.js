var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo.js');
var { User } = require('./models/User.js');

app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    todo => {
      res.send(todo);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// app.post('/user', (req, res) => {
//   console.log(req.body);
//   var user = new User({
//     email: req.body.email
//   });

//   user.save().then(
//     user => {
//       res.send(user);
//     },
//     err => {
//       res.status(400).send(err);
//     }
//   );
// });

app.listen(3000, () => {
  console.log('on port 3000');
});

module.exports = { app };
