var http = require('http'),
    express = require('express'),
    session = require('express-session'),
    twilio = require('twilio');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false})); 
app.use(session({ secret: 'its really a burrito :)' }));

var questionCount = 0;
var message = "";

app.post('/sms', function(req, res) {
  
  var question = req.body.Body.toLowerCase();
  var askForANOTHERONE = "Please enter what you think it is. Is it a ______ ? fill in the blank";

    if(questionCount == 0){
        message = "Hi Welcome to the 20 questions game may the odds forever be in your favor!";
        questionCount++;
    }
    else if(questionCount > 0 && questionCount < 21) {
      
        answer();
        questionCount ++;
        console.log(question);
        console.log(questionCount);
        console.log(message);
    } 
    else {
        message = "Sorry but you're out of questions try back in 4 hours mwuhahahahaha";
     }

  function answer(){
      console.log("it went to the switch");
     switch(question){
         case "taco":
            taco();
            break;
        case "food":
            food();
            break;
         case "mexico":
            mexico();
            break;
        case "mexican":
            mexican();
            break;
        case "wrap":
            wrap();
            break;
        case "beans":
            beans();
            break;
        case "tortilla":
            tortilla();
            break;
        case "taco bell" || "tacobell":
            tacobell();
            break;
        case "burrito":
            burrito();
            break;
        default:
        regularResponse();
        console.log("reg response");
        break;
     }
        
    
  }

  req.session.counter = questionCount;

  var twiml = new twilio.TwimlResponse();
  twiml.message(message);
  if (questionCount<21){
      twiml.message(askForANOTHERONE);
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

function burrito(){
    message = "You got it right!!!!";
    questionCount = 0;
}

function regularResponse(){
    message = "Nope try again";
}

function tortilla (){
    message = "You're pretty close";
}

function tacobell(){
    message = "Nope but it can be bought there";
}
function food(){
    message = "it is indeed a food";
}

function beans(){
    message = "They're in it if that helps :)";
}

function wrap (){
    message = "No silly";
}

function mexico(){
    message =  "Can buy one there";
}

function mexican() {
    message = "It's definitely a mexican food. Bet you trump doesnt like them :P";
}

function taco(){
    message = "It's definitely not a TACO";
}

http.createServer(app).listen(7777, function () {
  console.log("Express server listening on port 7777");
});