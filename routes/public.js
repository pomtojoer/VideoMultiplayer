const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');

// Home page
router.get("/", (req, res) => {
  res.render("index");
});

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


router.post('/',(req,res) => {
  // Access post body
  const body = req.body;
  const screenName = body.screenNameInput;
  const gameID = body.gameID;
  var roomId = body.roomIDInput;

  // Check for create or join
  if (typeof body.roomIDInput == 'undefined') {
    // Create new room
    roomId = Math.round((Math.random() * 1000000));

  } 
  res.redirect('/'+gameID+'Multiplayer'+'/'+roomId);
});

module.exports = router;