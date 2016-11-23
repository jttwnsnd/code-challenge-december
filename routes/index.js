var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var storedNames = [];
var api = '';
router.post('/searchRequest', function(req, res, next){
  console.log(req.body.nameList);
  console.log(req.body.api);
  var tempNames = [];
  for(var i = 0; i < req.body.nameList.length; i++){
    var temp = req.body.api + req.body.nameList[i];
    var string = temp.toString();
    tempNames.push({
      name: req.body.nameList[i],
      apiLink: string
    })
  }
  storedNames = tempNames;
  api = req.body.api;
  res.json({
    message: "I connected"
  })
})

router.get('/requestingList', function(req, res, next){
  for(var i = 0; i < storedNames.length; i++){
    request({
      method: "GET",
      uri: "https://api.github.com/users/" + storedNames[i].name
    }, function(error, response, body){
      console.log(response.statusCode);
    })
  }
  res.json({
    message: "done"
  })
  // request(string, function(error, response, body){
  //   console.log(error);
  //   console.log(response.statusCode);
  // })
})

// for(var i = 0; i < req.body.nameList.length; i++){
  // var temp = req.body.api + req.body.nameList[1];
  // var string = temp.toString();
  // console.log(string);
  // request(string, function(error, response, body){
  //   console.log(error);
  //   console.log(response.statusCode);
  // })
// }

module.exports = router;
