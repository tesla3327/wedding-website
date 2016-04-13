var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var api_key = 'key-0236a7d41558dcb08090850b0f086551';
var domain = 'sandboxb0dc4b251fb84b058a0db7c7e7a7cbb9.mailgun.org';
var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});

var guestList = [
  [
    { first: 'Michael', last: 'Thiessen' },
    { first: 'Grace', last: 'Teeninga' },
  ],
  [{ first: 'Carlin', last: 'Penner' }],
  [{ first: 'Travis', last: 'Petkau' }],
  [
    { first: 'one', last: 'person'},
    { first: 'two', last: 'person'},
    { first: 'three', last: 'person'},
    { first: 'four', last: 'person'},
  ],
  [
    { first: 'Matthew', last: 'Hayashida'},
    { first: 'Ian', last: 'Reed'},
    { first: 'Joel', last: 'Francis'},
    { first: 'Matthew', last: 'Waldmann'},
  ]
];

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../public/index.html');
});

app.get('/testapi', function(req, res) {
  res.send('Hello');
});

app.get('/checkName', function(req, res) {
  var checkGuest = {
    first: req.query.first,
    last: req.query.last
  };
  var additionalGuests = [];
  var isMatch = false;
  var addGuests = false;

  guestList.forEach( function(group) {
    var extraGuests = [];
    group.forEach( function(guest) {
      if (guest.first.toLowerCase() === checkGuest.first.toLowerCase() &&
          guest.last.toLowerCase() === checkGuest.last.toLowerCase()) {
        isMatch = true;
        addGuests = true;
      } else {
        extraGuests.push(guest);
      }
    });

    if (addGuests) {
      additionalGuests = extraGuests;
      addGuests = false;
    }
  });

  var body = {
    isMatch: isMatch,
    additionalGuests: additionalGuests
  };

  console.log(isMatch);
  console.log(additionalGuests); 

  res.send(body);
});

app.post('/rsvp', function(req, res) {
  var first = req.body.first;
  var last = req.body.last;
  var attending = req.body.attending;
  var email = req.body.email;
  var comments = req.body.comments || '';

  var isMatch = false;
  var guest;
  guestList.forEach(function(group) {

    group.forEach( function(_guest) {
      if (_guest.first.toLowerCase() === first.toLowerCase() &&
          _guest.last.toLowerCase() === last.toLowerCase()) {
        isMatch = true;
        guest = _guest;
        guest.attending = attending;
        guest.email = email;
        guest.comments = comments;
        console.log('Match found');
      }
    });

  });

  if (isMatch) {
    res.sendStatus(202);
    logGuest(guest);
    sendEmail(guest);
  } else {
    res.sendStatus(401);
  }
});

app.listen(3000, '0.0.0.0', function() {
  console.log('Server started.');
});

function logGuest( guest ) {
  console.log('----------------------------');
  console.log('Name: ' + guest.first + ' ' + guest.last );
  console.log('Email: ' + guest.email );
  console.log('Attending: ' + (guest.attending ? 'yes' : 'no'));
  console.log('Comments: ' + guest.comments);
}

function sendEmail( guest ) {
   
  var data = {
    from: 'electromikenetic@gmail.com',
    to: 'electromikenetic@gmail.com',
    subject: '[RSVP] ' + guest.first + ' ' + guest.last + ' - ' + (guest.attending ? 'Attending' : 'Not Attending'),
    text: 'Email: ' + guest.email + '\n\nComments:\n' + (guest.comments || 'No comments.')
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(error);
    console.log(body);
  });
}





