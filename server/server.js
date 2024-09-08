const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:

let calculations = [];
let result = 0;

// Here's a wonderful place to make some routes:

//GET / calculations;
app.get('/calculations', (req, res) => {
  res.send(calculations);
});

// POST /calculations
app.post('/calculations', (req, res) => {
  console.log(req.body); //  {"numOne": 1, "numTwo": 2, "operator": "+"}
  if (req.body.numOne && req.body.numTwo && req.body.operator) {
    if (req.body.operator === '+') {
      result = req.body.numOne + req.body.numTwo;
    } else if (req.body.operator === '-') {
      result = req.body.numOne - req.body.numTwo;
    } else if (req.body.operator === '*') {
      result = req.body.numOne * req.body.numTwo;
    } else if (req.body.operator === '/') {
      result = req.body.numOne / req.body.numTwo;
    }
    const calcObj = { numOne: req.body.numOne, numTwo: req.body.numTwo, operator: req.body.operator, result: result };

    calculations.push(calcObj);

    res.sendStatus(201);
  } else {
    res.status(400).send('calculations object requires two number inputs and an operator (e.g. +,-,*,/');
  }
});


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;
