const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    questionId: "1",
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];

const SUBMISSIONS = [{
    submissionId : "",
    user : "",
    answer: "",
    accepted: false
}]

app.get('/', function(req,res) {
    res.send("Welcome to Code Jutsu")
})

function userExists(email) {
    return USERS.some(user => {
        USERS.email === email
    });
}

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
    const {email, password} = req.body

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
    if(userExists(email)) 
        return res.status(409).send("user alredy exists.");
    else {
        const newUser = {email, password};
        USERS.push(newUser);
        res.sendStatus(200);
    }
  // return back 200 status code to the client
});

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user = USERS.find(user => user.email === email);

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
    if (user && user.password == password) {
        const token = Math.random().toString(36).substring(7);
        res.status(200).json({token});
    } else {
        res.status(401).send("invalid email address or password");
    }
});

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.json(QUESTIONS);
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
    const userSubmissions = SUBMISSIONS.filter(submission => submission.user === req.user);
    res.json(userSubmissions);
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
    let submission = req.body;
    submission.user = req.user;
    submission.submissionId = SUBMISSIONS.length()++;
    submission.accepted = Math.random() < 0.5;
    submission.answer = req.answer;
    SUBMISSIONS.push(submission);
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})